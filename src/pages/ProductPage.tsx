import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { graphql } from '../lib/magentoClient'
import { PRODUCT_BY_URL_QUERY } from '../graphql/products'
import type { ProductByUrlData, ProductDetail } from '../types/products'
import './ProductPage.css'

export function ProductPage() {
  const { urlKey } = useParams()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      if (!urlKey) {
        setError('Missing product url key')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const url = `${urlKey}.html`
        const data = await graphql<ProductByUrlData>(PRODUCT_BY_URL_QUERY, {
          variables: { url },
        })
        if (!data.route) {
          throw new Error('Product not found')
        }
        setProduct(data.route)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [urlKey])

  if (loading) return <p>Loading product…</p>
  if (error) return <p>Error: {error}</p>
  if (!product) return <p>Product not found</p>

  const price = product.price_range.minimum_price.regular_price

  return (
    <section className="pdp">
      <div className="pdp__media">
        {product.image?.url ? (
          <img src={product.image.url} alt={product.image.label ?? product.name} />
        ) : null}
      </div>
      <div className="pdp__info">
        <h1>{product.name}</h1>
        <p className="pdp__sku">SKU: {product.sku}</p>
        <p className="pdp__price">
          {price.value} {price.currency}
        </p>
        {product.short_description?.html ? (
          <div
            className="pdp__short"
            dangerouslySetInnerHTML={{ __html: product.short_description.html }}
          />
        ) : null}
        {product.description?.html ? (
          <div
            className="pdp__description"
            dangerouslySetInnerHTML={{ __html: product.description.html }}
          />
        ) : null}
      </div>
    </section>
  )
}