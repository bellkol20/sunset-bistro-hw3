import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navClass = ({ isActive }) =>
  [
    'relative block py-2 md:py-1 text-neutral-800 transition-colors',
    'after:absolute after:left-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-orange-500 after:to-amber-300 after:transition-all after:duration-200',
    isActive ? 'after:w-full font-medium' : 'after:w-0 hover:after:w-full',
  ].join(' ')

export function Header() {
  const { totalCount } = useCart()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-[#faf7f3]/95 backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-[1100px] items-center justify-between gap-4 px-4 py-3 md:px-5">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em]"
          onClick={close}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-300 text-[0.7rem] text-[#1f1308]">
            SB
          </span>
          <span className="hidden sm:inline">Sunset Bistro</span>
        </Link>

        <nav
          id="mainNav"
          className={[
            'z-30 border-b border-black/10 bg-[#faf7f3]/98 md:relative md:border-0 md:bg-transparent',
            open ? 'absolute inset-x-0 top-full block' : 'hidden md:block',
          ].join(' ')}
          aria-label="Main"
        >
          <ul className="flex flex-col gap-0 px-4 pb-3 pt-1 md:flex-row md:items-center md:gap-7 md:p-0 md:text-[0.95rem]">
            <li>
              <NavLink to="/" end className={navClass} onClick={close}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className={navClass} onClick={close}>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navClass} onClick={close}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navClass} onClick={close}>
                Contact
              </NavLink>
            </li>
            <li>
              <Link
                to="/menu#shopping-cart"
                className="block py-2 font-semibold text-neutral-800 md:inline md:py-1"
                onClick={close}
              >
                Cart ({totalCount})
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className={[
            'inline-flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-black/10 bg-white p-2 md:hidden',
            open ? 'open' : '',
          ].join(' ')}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={[
              'h-0.5 w-full rounded-full bg-neutral-800 transition',
              open ? 'translate-y-[7px] rotate-45' : '',
            ].join(' ')}
          />
          <span
            className={[
              'h-0.5 w-full rounded-full bg-neutral-800 transition',
              open ? 'opacity-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'h-0.5 w-full rounded-full bg-neutral-800 transition',
              open ? '-translate-y-[7px] -rotate-45' : '',
            ].join(' ')}
          />
        </button>
      </div>
    </header>
  )
}
