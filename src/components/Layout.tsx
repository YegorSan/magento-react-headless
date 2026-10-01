import { Link, Outlet } from 'react-router-dom'
import './Layout.css'
import { MainNav } from './MainNav'

export function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <Link to="/" className="site-logo">
          Store
        </Link>
        <MainNav />
      </header>
      <main className="site-main">
        <Outlet />
      </main>
    </div>
  )
}
