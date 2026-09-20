export const CATEGORY_NAV_QUERY = `
  {
    categoryList(filters: { parent_id: { eq: "2" } }) {
      id
      name
      url_path
      url_key
      product_count
      children {
        id
        name
        url_path
        url_key
        product_count
        children {
          id
          name
          url_key
          product_count
        }
      }
    }
  }
`

export const CATEGORY_BY_URL_KEY_QUERY = `
  query CategoryByUrlKey($urlKey: String!) {
    categoryList(filters: { url_key: { eq: $urlKey } }) {
      id
      name
      url_key
      url_path
      product_count
      display_mode
      description
      cms_block {
        identifier
        title
        content
      }
      children {
        id
        name
        url_key
        product_count
      }
    }
  }
`
