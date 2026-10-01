import { useParams } from 'react-router-dom'
import { graphql } from '../lib/magentoClient'
import { PRODUCT_BY_URL_QUERY } from '../graphql/products'
import { useEffect, useState } from 'react'
import { magentoMediaUrl } from '../lib/magentoMediaUrl'
import './ProductPage.css'

type ProductDetail = {
  sku: string
  name: string
  url_key: string
  image?: { url?: string | null; label?: string | null } | null
  price_range: {
    minimum_price: {
      regular_price: { value: number; currency: string }
    }
  }
  description?: { html?: string | null } | null
  short_description?: { html?: string | null } | null
}

export function ProductPage() {
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const { urlKey } = useParams()

  useEffect(() => {
    async function load() {
      if (!urlKey) return
      setLoading(true)
      try {
        const data = await graphql<{ route: ProductDetail | null }>(PRODUCT_BY_URL_QUERY, {
          url: `${urlKey}.html`,
        })
        setProduct(data.route ?? null)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [urlKey])

  if (loading) return <p>Loading…</p>
  if (!product) return <p>Not found</p>

  return (
    <section className="pdp">
      <div className="pdp__media">
        {magentoMediaUrl(product.image?.url) ? (
          <img
            src={magentoMediaUrl(product.image?.url)}
            alt={product.image?.label ?? product.name}
          />
        ) : null}
      </div>
  
      <div className="pdp__info">
        <h1>{product.name}</h1>
        <p className="pdp__sku">SKU: {product.sku}</p>
        <p className="pdp__price">
          {product.price_range.minimum_price.regular_price.value}
          {' '}
          {product.price_range.minimum_price.regular_price.currency}
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