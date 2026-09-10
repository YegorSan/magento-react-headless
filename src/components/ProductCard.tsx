import { Link } from 'react-router-dom'
import type { ProductListItem } from '../types/products'

type Props = {
  product: ProductListItem
}

export function ProductCard({ product }: Props) {
  const price = product.price_range.minimum_price.regular_price
  return (
    <li className="product-card">
      <Link to={`/product/${product.url_key}`}>
        {product.small_image?.url ? (
          <img className="product-card__image"
            src={product.small_image.url}
            alt={product.name}
            width={120}
          />
        ) : null}
        <h2 className="product-card__title">{product.name}</h2>
        <p className="product-card__sku">{product.sku}</p>
        <p>
          {price.value} {price.currency} className="product-card__price"
        </p>
      </Link>
    </li>
  )
}