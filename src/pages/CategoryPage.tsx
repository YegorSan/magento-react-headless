import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { graphql } from '../lib/magentoClient'
import { PRODUCTS_BY_CATEGORY_QUERY } from '../graphql/products'
import type { ProductListItem, ProductsData } from '../types/products'
import { ProductCard } from '../components/ProductCard'
import { CATEGORY_BY_URL_KEY_QUERY } from '../graphql/categories'

import type { CategoryByUrlKeyData, CategoryNavItem } from '../types/category'

export function CategoryPage() {
  const { urlKey } = useParams()
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [category, setCategory] = useState<CategoryNavItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      if (!urlKey) {
        setError('Missing category id')
        setLoading(false)
        return
      }

      try {
        const categoryData = await graphql<CategoryByUrlKeyData>(
            CATEGORY_BY_URL_KEY_QUERY,
            { variables: { urlKey } },
          )
          const found = categoryData.categoryList[0]
          if (!found) {
            throw new Error('Category not found')
          }
          setCategory(found)

          const categoryIds = [
            String(found.id),
            ...(found.children?.map((child) => String(child.id)) ?? []),
          ]
          
          const productsData = await graphql<ProductsData>(
            PRODUCTS_BY_CATEGORY_QUERY,
            { variables: { categoryIds } },
          )
          setProducts(productsData.products.items)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [urlKey])

  if (loading) return <p>Loading category...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section>
      <h1>{category?.name ?? urlKey}</h1>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </ul>
    </section>
  )
}