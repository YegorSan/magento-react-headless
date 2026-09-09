import { Link, Outlet } from 'react-router-dom'
import { MainNav } from './MainNav'


export function Layout() {
  return (
    <div>
      <header>
        <Link to="/">Store</Link>
        <MainNav />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}