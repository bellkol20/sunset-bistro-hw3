import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useCart } from '../context/CartContext'

function formatCurrency(value) {
  return `$${value.toFixed(2)}`
}

export function Menu() {
  const {
    cart,
    totalPrice,
    loading: cartLoading,
    syncError,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    placeOrder,
  } = useCart()

  const [menuSections, setMenuSections] = useState([])
  const [menuLoading, setMenuLoading] = useState(true)
  const [menuError, setMenuError] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const [orderMessage, setOrderMessage] = useState(null)
  const [placingOrder, setPlacingOrder] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function loadMenu() {
      try {
        const data = await api.getMenu()
        if (!cancelled) setMenuSections(data)
      } catch (err) {
        if (!cancelled) setMenuError(err.message)
      } finally {
        if (!cancelled) setMenuLoading(false)
      }
    }
    loadMenu()
    return () => {
      cancelled = true
    }
  }, [])

  const hasItems = cart.length > 0

  async function handlePlaceOrder() {
    setPlacingOrder(true)
    setOrderMessage(null)
    try {
      const order = await placeOrder(customerName.trim() || 'Guest')
      setOrderMessage(`Order #${order._id.slice(-6)} placed successfully! Total: ${formatCurrency(order.total)}`)
      setCustomerName('')
    } catch (err) {
      setOrderMessage(err.message)
    } finally {
      setPlacingOrder(false)
    }
  }

  if (menuLoading) {
    return (
      <section className="mx-auto max-w-[1100px] px-4 py-16 text-center md:px-5">
        <p className="text-neutral-600">Loading menu from database…</p>
      </section>
    )
  }

  if (menuError) {
    return (
      <section className="mx-auto max-w-[1100px] px-4 py-16 md:px-5">
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-red-700">
          Could not load menu: {menuError}. Make sure the API server and MongoDB are running.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className="bg-gradient-to-br from-orange-200/40 via-transparent to-amber-200/40 px-4 py-12 md:px-5">
        <div className="mx-auto max-w-[1100px]">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Our Menu</h1>
          <p className="text-neutral-600">Thoughtfully curated dishes for every occasion.</p>
        </div>
      </section>

      {menuSections.map((section) => (
        <section key={section.title} className="mx-auto max-w-[1100px] px-4 py-8 md:px-5">
          <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <article
                key={item._id}
                className="rounded-3xl bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.08)]"
              >
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <h3 className="text-[1.02rem] font-semibold">{item.name}</h3>
                  <span className="shrink-0 font-bold text-orange-500">
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <p className="text-sm text-neutral-600">{item.description}</p>
                <button
                  type="button"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border-2 border-orange-500 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-500/10 sm:w-auto sm:px-4"
                  onClick={() => addItem(item.name, item.price, item._id)}
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section
        id="shopping-cart"
        className="mx-auto max-w-[1100px] scroll-mt-24 px-4 pb-16 pt-4 md:px-5"
      >
        <h2 className="mb-4 text-2xl font-semibold">Shopping Cart</h2>
        {syncError && (
          <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Cart sync issue: {syncError}
          </p>
        )}
        {cartLoading && (
          <p className="mb-3 text-sm text-neutral-500">Loading your saved cart…</p>
        )}
        <div className="rounded-3xl bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          {!hasItems && (
            <p className="text-sm text-neutral-600">
              Your cart is empty. Add items from the menu above.
            </p>
          )}
          <ul className="grid gap-3" aria-live="polite">
            {cart.map((item) => {
              const lineTotal = item.price * item.quantity
              return (
                <li
                  key={item.name}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-900/10 px-4 py-3"
                >
                  <span className="font-semibold">{item.name}</span>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-900/20 bg-white font-semibold"
                      aria-label={`Decrease quantity for ${item.name}`}
                      onClick={() => updateQuantity(item.name, 'decrease')}
                    >
                      −
                    </button>
                    <span>Qty: {item.quantity}</span>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-900/20 bg-white font-semibold"
                      aria-label={`Increase quantity for ${item.name}`}
                      onClick={() => updateQuantity(item.name, 'increase')}
                    >
                      +
                    </button>
                    <span className="text-neutral-600">{formatCurrency(item.price)} each</span>
                    <span className="font-medium">Line: {formatCurrency(lineTotal)}</span>
                    <button
                      type="button"
                      className="rounded-lg bg-orange-500/10 px-2 py-1 text-sm font-semibold text-orange-500"
                      onClick={() => removeItem(item.name)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm">
              <span className="font-medium text-neutral-700">Name for order (optional)</span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Guest"
                className="rounded-xl border border-slate-900/15 bg-[#fefdfb] px-3 py-2 outline-none ring-orange-500/25 focus:ring-2"
              />
            </label>
            {orderMessage && (
              <p
                className={`rounded-xl px-3 py-2 text-sm ${
                  orderMessage.includes('successfully')
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {orderMessage}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-lg font-bold">Total: {formatCurrency(totalPrice)}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!hasItems || placingOrder}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-300 px-6 py-2.5 text-sm font-semibold text-[#1f1308] shadow-[0_10px_25px_rgba(249,115,22,0.3)] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handlePlaceOrder}
              >
                {placingOrder ? 'Placing…' : 'Place Order'}
              </button>
              <button
                type="button"
                disabled={!hasItems}
                className="inline-flex items-center justify-center rounded-full border-2 border-orange-500 px-6 py-2.5 text-sm font-semibold text-orange-500 transition enabled:hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
