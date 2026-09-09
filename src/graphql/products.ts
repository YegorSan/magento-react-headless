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