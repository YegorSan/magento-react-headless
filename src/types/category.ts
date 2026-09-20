export type CategoryNavItem = {
  id: number
  name: string
  url_path: string
  url_key: string
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

export function categoryHasProducts(category: CategoryNavItem): boolean {
  if ((category.product_count ?? 0) > 0) return true
  return (category.children ?? []).some((child) => (child.product_count ?? 0) > 0)
}
