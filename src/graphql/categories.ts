export const CATEGORY_NAV_QUERY = `
  {
    categoryList(filters: { parent_id: { eq: "2" } }) {
      id
      name
      url_path
      url_key
      children {
        id
        name
        url_path
        url_key
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
    }
  }
`