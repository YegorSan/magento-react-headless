import { useEffect, useState } from 'react'
import { graphql } from '../lib/magentoClient'
import { PRODUCTS_QUERY } from '../graphql/products'
import { ProductCard } from '../components/ProductCard'
import type { ProductListItem, ProductsData } from '../types/products'
import './Home.css'

export function HomePage() {
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await graphql<ProductsData>(PRODUCTS_QUERY)
        setProducts(data.products.items)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>Loading…</p>

  return (
    <section className="plp">
      <h1 className="plp__title">Products</h1>
      <ul className="plp__grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.sku}
            product={product}
            priority={index === 0}
          />
        ))}
      </ul>
    </section>
  )
}
