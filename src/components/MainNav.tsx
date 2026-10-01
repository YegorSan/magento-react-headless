import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_NAV_QUERY } from '../graphql/categories'
import { graphql } from '../lib/magentoClient'
import './MainNav.css'

type NavCategory = {
  id: number
  name: string
  url_key: string
  children?: NavCategory[]
}

export function MainNav() {
  const [categories, setCategories] = useState<NavCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await graphql<{ categoryList: NavCategory[] }>(CATEGORY_NAV_QUERY)
        setCategories(data.categoryList)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>Loading…</p>
  if (!categories.length) return <p>No categories found</p>

  return (
    <nav className="site-nav">
      <Link to="/">Products</Link>
      {categories.map((cat) => (
        <div key={cat.id} className="nav-item">
          <Link to={`/category/${cat.url_key}`}>{cat.name}</Link>
          {cat.children && cat.children.length > 0 ? (
            <ul className="nav-item__submenu">
              {cat.children.map((child) => {
                const hasGrandchildren =
                  Boolean(child.children && child.children.length > 0)

                return (
                  <li
                    key={child.id}
                    className={
                      hasGrandchildren
                        ? 'nav-item__subitem nav-item__subitem--has-kids'
                        : 'nav-item__subitem'
                    }
                  >
                    <Link to={`/category/${child.url_key}`}>{child.name}</Link>
                    {hasGrandchildren ? (
                      <ul className="nav-item__submenu nav-item__submenu--nested">
                        {child.children!.map((grand) => (
                          <li key={grand.id}>
                            <Link to={`/category/${grand.url_key}`}>
                              {grand.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      ))}
    </nav>
  )
}
