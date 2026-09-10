import { Link, Outlet } from 'react-router-dom'
import { MainNav } from './MainNav'
import './Layout.css'

export function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <Link to="/" className="site-logo">Store</Link>
        <MainNav />
      </header>
      <main className="site-main">
        <Outlet />
      </main>
    </div>
  )
}