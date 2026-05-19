import { useEffect, useState } from 'react'
import { api } from '../api/client'

const emptyForm = { section: 'Starters', name: '', price: '', description: '' }

const ORDER_STATUSES = ['pending', 'preparing', 'completed', 'cancelled']

export function Admin() {
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState(null)

  async function loadItems() {
    setLoading(true)
    try {
      const data = await api.getMenuItems()
      setItems(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function loadOrders() {
    try {
      const data = await api.getOrders()
      setOrders(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadItems()
    loadOrders()
  }, [])

  async function handleOrderStatus(id, status) {
    try {
      await api.updateOrder(id, { status })
      setMessage('Order status updated in MongoDB.')
      await loadOrders()
    } catch (err) {
      setMessage(err.message)
    }
  }

  async function handleOrderDelete(id) {
    if (!window.confirm('Delete this order from the database?')) return
    try {
      await api.deleteOrder(id)
      setMessage('Order deleted from MongoDB.')
      await loadOrders()
    } catch (err) {
      setMessage(err.message)
    }
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)
    const payload = {
      section: form.section,
      name: form.name,
      price: Number(form.price),
      description: form.description,
    }
    try {
      if (editingId) {
        await api.updateMenuItem(editingId, payload)
        setMessage('Menu item updated in MongoDB.')
      } else {
        await api.createMenuItem(payload)
        setMessage('Menu item created in MongoDB.')
      }
      resetForm()
      await loadItems()
    } catch (err) {
      setMessage(err.message)
    }
  }

  function startEdit(item) {
    setEditingId(item._id)
    setForm({
      section: item.section,
      name: item.name,
      price: String(item.price),
      description: item.description,
    })
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this menu item from the database?')) return
    setMessage(null)
    try {
      await api.deleteMenuItem(id)
      setMessage('Menu item deleted from MongoDB.')
      if (editingId === id) resetForm()
      await loadItems()
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <section className="mx-auto max-w-[900px] px-4 py-12 md:px-5">
      <h1 className="mb-2 text-3xl font-bold">Menu Admin</h1>
      <p className="mb-6 text-neutral-600">
        Create, update, and delete menu items. Changes persist in MongoDB and appear on the Menu
        page.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-3 rounded-3xl bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.08)]"
      >
        <h2 className="text-lg font-semibold">{editingId ? 'Edit item' : 'Add new item'}</h2>
        <label className="grid gap-1 text-sm">
          Section
          <select
            value={form.section}
            onChange={(e) => setForm({ ...form, section: e.target.value })}
            className="rounded-xl border border-slate-900/15 px-3 py-2"
          >
            <option>Starters</option>
            <option>Mains</option>
            <option>Desserts</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-xl border border-slate-900/15 px-3 py-2"
          />
        </label>
        <label className="grid gap-1 text-sm">
          Price
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="rounded-xl border border-slate-900/15 px-3 py-2"
          />
        </label>
        <label className="grid gap-1 text-sm">
          Description
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded-xl border border-slate-900/15 px-3 py-2"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white"
          >
            {editingId ? 'Save changes' : 'Create item'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-slate-900/20 px-5 py-2 text-sm font-semibold"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {message && (
        <p className="mb-4 rounded-xl bg-orange-50 px-3 py-2 text-sm text-orange-900">{message}</p>
      )}
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {loading ? (
        <p>Loading menu items…</p>
      ) : (
        <ul className="grid gap-3">
          {items.map((item) => (
            <li
              key={item._id}
              className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-slate-900/10 bg-white px-4 py-3"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-orange-500">
                  {item.section}
                </p>
                <p className="font-semibold">
                  {item.name} — ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded-lg bg-red-50 px-3 py-1 text-sm font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="mb-4 mt-12 text-2xl font-semibold">Orders</h2>
      <p className="mb-4 text-sm text-neutral-600">
        Update status or delete orders placed from the Menu page.
      </p>
      {orders.length === 0 ? (
        <p className="text-sm text-neutral-500">No orders yet.</p>
      ) : (
        <ul className="grid gap-3">
          {orders.map((order) => (
            <li
              key={order._id}
              className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3"
            >
              <p className="font-semibold">
                {order.customerName} — ${order.total.toFixed(2)}
              </p>
              <p className="text-xs text-neutral-500">
                ID: …{order._id.slice(-6)} · {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {order.items.map((i) => `${i.name} ×${i.quantity}`).join(', ')}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <select
                  value={order.status}
                  onChange={(e) => handleOrderStatus(order._id, e.target.value)}
                  className="rounded-lg border border-slate-900/15 px-2 py-1 text-sm"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleOrderDelete(order._id)}
                  className="rounded-lg bg-red-50 px-3 py-1 text-sm font-semibold text-red-600"
                >
                  Delete order
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
