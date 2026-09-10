import { Link } from 'react-router-dom'
import type { ProductListItem } from '../types/products'
import './ProductCard.css'

type Props = {
  product: ProductListItem
}

export function ProductCard({ product }: Props) {
  const price = product.price_range.minimum_price.regular_price
  return (
    <li className="product-card">
      <Link className="product-card__link" to={`/product/${product.url_key}`}>
        <div className="product-card__image-wrap">
          {product.small_image?.url ? (
            <img
              className="product-card__image"
              src={product.small_image.url}
              alt={product.name}
              width={120}
              height={120}
              loading="lazy"
            />
          ) : null}
        </div>
        <h2 className="product-card__name">{product.name}</h2>
        <p className="product-card__sku">{product.sku}</p>
        <p className="product-card__price">
          {price.value} {price.currency}
        </p>
      </Link>
    </li>
  )
}
