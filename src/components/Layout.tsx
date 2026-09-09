import { Link, Outlet } from 'react-router-dom'
export function Layout() {
  return (
    <div>
      <header>
        <Link to="/">Store</Link>
        {/* пізніше: Cart, Login */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}