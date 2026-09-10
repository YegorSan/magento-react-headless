export const PRODUCTS_QUERY = `
  {
    products(search: "", pageSize: 12) {
      total_count
      items {
        sku
        name
        url_key
        small_image { url }
        price_range {
          minimum_price {
            regular_price { value currency }
          }
        }
      }
    }
  }
`

export const PRODUCTS_BY_CATEGORY_QUERY = `
  query ProductsByCategory($categoryIds: [String!]!) {
    products(
      filter: { category_id: { in: $categoryIds } }
      pageSize: 12
    ) {
      total_count
      items {
        sku
        name
        url_key
        small_image { url }
        price_range {
          minimum_price {
            regular_price { value currency }
          }
        }
      }
    }
  }
`