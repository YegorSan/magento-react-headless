import { useEffect, useState } from 'react'
import { graphql } from '../lib/magentoClient'
import { PRODUCTS_QUERY } from '../graphql/products'
import type { ProductListItem, ProductsData } from '../types/products'
import { ProductCard } from '../components/ProductCard'
export function ProductListPage() {
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function load() {
      try {
        const data = await graphql<ProductsData>(PRODUCTS_QUERY)
        setProducts(data.products.items)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])
  if (loading) return <p>Loading products…</p>
  if (error) return <p>Error: {error}</p>
  return (
    <section>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </ul>
    </section>
  )
}