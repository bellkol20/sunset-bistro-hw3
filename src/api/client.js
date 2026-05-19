const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || res.statusText)
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  getMenu: () => request('/menu'),
  getMenuItems: () => request('/menu/items'),
  createMenuItem: (data) =>
    request('/menu', { method: 'POST', body: JSON.stringify(data) }),
  updateMenuItem: (id, data) =>
    request(`/menu/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMenuItem: (id) => request(`/menu/${id}`, { method: 'DELETE' }),
  getCart: (sessionId) => request(`/carts/${sessionId}`),
  updateCart: (sessionId, items) =>
    request(`/carts/${sessionId}`, { method: 'PUT', body: JSON.stringify({ items }) }),
  clearCartApi: (sessionId) => request(`/carts/${sessionId}`, { method: 'DELETE' }),
  placeOrder: (sessionId, customerName) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify({ sessionId, customerName }),
    }),
  getOrders: () => request('/orders'),
  updateOrder: (id, data) =>
    request(`/orders/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteOrder: (id) => request(`/orders/${id}`, { method: 'DELETE' }),
}
