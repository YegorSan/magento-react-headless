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

  export type ProductDetail = {
    sku: string
    name: string
    url_key: string
    description?: { html?: string | null } | null
    short_description?: { html?: string | null } | null
    image?: { url?: string | null; label?: string | null } | null
    price_range: {
      minimum_price: {
        regular_price: Money
      }
    }
  }
  
  export type ProductByUrlData = {
    route: ProductDetail | null
  }