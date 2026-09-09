import { Link } from 'react-router-dom'
import type { ProductListItem } from '../types/products'

type Props = {
  product: ProductListItem
}

export function ProductCard({ product }: Props) {
  const price = product.price_range.minimum_price.regular_price
  return (
    <li>
      <Link to={`/product/${product.url_key}`}>
        {product.small_image?.url ? (
          <img
            src={product.small_image.url}
            alt={product.name}
            width={120}
          />
        ) : null}
        <h2>{product.name}</h2>
        <p>{product.sku}</p>
        <p>
          {price.value} {price.currency}
        </p>
      </Link>
    </li>
  )
}