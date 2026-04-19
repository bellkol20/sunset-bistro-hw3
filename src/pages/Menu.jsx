import { useCart } from '../context/CartContext'
import { menuSections } from '../data/site'

function formatCurrency(value) {
  return `$${value.toFixed(2)}`
}

export function Menu() {
  const { cart, totalPrice, addItem, updateQuantity, removeItem, clearCart } = useCart()
  const hasItems = cart.length > 0

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
                key={item.name}
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
                  onClick={() => addItem(item.name, item.price)}
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
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-lg font-bold">
              Total: {formatCurrency(totalPrice)}
            </p>
            <button
              type="button"
              disabled={!hasItems}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-300 px-6 py-2.5 text-sm font-semibold text-[#1f1308] shadow-[0_10px_25px_rgba(249,115,22,0.3)] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
