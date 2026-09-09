import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from '../lib/magentoClient'
import { CATEGORY_NAV_QUERY } from '../graphql/categories'
import type { CategoryListData, CategoryNavItem } from '../types/category'

export function MainNav() {
  const [categories, setCategories] = useState<CategoryNavItem[]>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    async function load() {
      try {
        const data = await graphql<CategoryListData>(CATEGORY_NAV_QUERY)
        setCategories(data.categoryList)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      }
    }
    load()
  }, [])
  if (error) return <p>Nav error: {error}</p>
  return (
    <nav>
      <Link to="/">Home</Link>
      {categories.map((cat) => (
        <Link key={cat.id} to={`/category/${cat.url_key}`}>
          {cat.name}
        </Link>
      ))}
    </nav>
  )
}