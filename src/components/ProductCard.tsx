import { Link } from 'react-router-dom'
import { magentoMediaUrl } from '../lib/magentoMediaUrl'
import type { ProductListItem } from '../types/products'
import './ProductCard.css'

type Props = {
  product: ProductListItem
  priority?: boolean
}

export function ProductCard({ product, priority = false }: Props) {
  const price = product.price_range.minimum_price.regular_price
  const imageUrl = magentoMediaUrl(product.small_image?.url)

  return (
    <li className="product-card">
      {imageUrl ? (
        <img
          className="product-card__image"
          src={imageUrl}
          alt={product.name}
          width={400}
          height={400}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      ) : null}
      <Link className="product-card__name" to={`/product/${product.url_key}`}>
        {product.name}
      </Link>
      <p className="product-card__price">
        {price.value} {price.currency}
      </p>
    </li>
  )
}
