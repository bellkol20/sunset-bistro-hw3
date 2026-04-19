/* eslint-disable react-refresh/only-export-components -- context + hook pattern */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CART_STORAGE_KEY } from '../data/site'

function readCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readCart())

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const totalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  )

  const addItem = useCallback((name, price) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name)
      if (existing) {
        return prev.map((i) => (i.name === name ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { name, price, quantity: 1 }]
    })
  }, [])

  const updateQuantity = useCallback((name, action) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.name !== name) return item
          const next =
            action === 'increase' ? item.quantity + 1 : item.quantity - 1
          return { ...item, quantity: next }
        })
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeItem = useCallback((name) => {
    setCart((prev) => prev.filter((item) => item.name !== name))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const value = useMemo(
    () => ({
      cart,
      totalCount,
      totalPrice,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [cart, totalCount, totalPrice, addItem, updateQuantity, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
