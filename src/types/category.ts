export type CategoryNavItem = {
  id: number
  name: string
  url_key: string
  url_path?: string
  product_count?: number | null
  display_mode?: string | null
  description?: string | null
  cms_block?: {
    identifier?: string | null
    title?: string | null
    content?: string | null
  } | null
  children?: CategoryNavItem[]
}

export type CategoryListData = {
  categoryList: CategoryNavItem[]
}

export type CategoryByUrlKeyData = {
  categoryList: CategoryNavItem[]
}
