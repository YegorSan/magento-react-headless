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

export const PRODUCT_BY_URL_QUERY = `
  query ProductByUrl($url: String!) {
    route(url: $url) {
      ... on ProductInterface {
        sku
        name
        url_key
        description { html }
        short_description { html }
        image { url label }
        price_range {
          minimum_price {
            regular_price { value currency }
          }
        }
      }
    }
  }
`