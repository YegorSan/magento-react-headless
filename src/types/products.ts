export type Money = {
    value: number
    currency: string
  }

  export type ProductListItem = {
    sku: string
    name: string
    url_key: string
    small_image?: { url?: string | null } | null
    price_range: {
      minimum_price: {
        regular_price: Money
      }
    }
  }
  
  export type ProductsData = {
    products: {
      total_count: number
      items: ProductListItem[]
    }
  }