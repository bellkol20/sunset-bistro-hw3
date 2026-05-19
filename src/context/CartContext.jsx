/* eslint-disable react-refresh/only-export-components -- context + hook pattern */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../api/client'
import { SESSION_STORAGE_KEY } from '../data/site'

function getOrCreateSessionId() {
  let id = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_STORAGE_KEY, id)
  }
  return id
}

function mapCartItems(items = []) {
  return items.map((item) => ({
    menuItemId: item.menuItemId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }))
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const sessionId = useMemo(() => getOrCreateSessionId(), [])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncError, setSyncError] = useState(null)
  const skipSyncRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    async function loadCart() {
      try {
        const data = await api.getCart(sessionId)
        if (!cancelled) {
          skipSyncRef.current = true
          setCart(mapCartItems(data.items))
        }
      } catch (err) {
        if (!cancelled) setSyncError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadCart()
    return () => {
      cancelled = true
    }
  }, [sessionId])

  useEffect(() => {
    if (loading) return
    if (skipSyncRef.current) {
      skipSyncRef.current = false
      return
    }

    const timer = setTimeout(async () => {
      try {
        await api.updateCart(sessionId, cart)
        setSyncError(null)
      } catch (err) {
        setSyncError(err.message)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [cart, sessionId, loading])

  const totalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  )

  const addItem = useCallback((name, price, menuItemId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name)
      if (existing) {
        return prev.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { menuItemId, name, price, quantity: 1 }]
    })
  }, [])

  const updateQuantity = useCallback((name, action) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.name !== name) return item
          const next = action === 'increase' ? item.quantity + 1 : item.quantity - 1
          return { ...item, quantity: next }
        })
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeItem = useCallback((name) => {
    setCart((prev) => prev.filter((item) => item.name !== name))
  }, [])

  const clearCart = useCallback(async () => {
    setCart([])
    try {
      await api.clearCartApi(sessionId)
      setSyncError(null)
    } catch (err) {
      setSyncError(err.message)
    }
  }, [sessionId])

  const placeOrder = useCallback(
    async (customerName = 'Guest') => {
      const order = await api.placeOrder(sessionId, customerName)
      skipSyncRef.current = true
      setCart([])
      return order
    },
    [sessionId],
  )

  const value = useMemo(
    () => ({
      sessionId,
      cart,
      loading,
      syncError,
      totalCount,
      totalPrice,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      placeOrder,
    }),
    [
      sessionId,
      cart,
      loading,
      syncError,
      totalCount,
      totalPrice,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      placeOrder,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
