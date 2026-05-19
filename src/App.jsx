import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Menu } from './pages/Menu'
import { Contact } from './pages/Contact'
import { Admin } from './pages/Admin'

export default function App() {
  // Match Vite `base` so routes work on GitHub Pages (project site under /<repo>/)
  const base = import.meta.env.BASE_URL
  const basename = base === '/' ? undefined : base.replace(/\/$/, '')

  return (
    <BrowserRouter basename={basename}>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="menu" element={<Menu />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
