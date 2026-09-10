  
export type CategoryNavItem = {
    id: number
    name: string
    url_path: string
    url_key: string
    children?: CategoryNavItem[]
  }


  export type CategoryListData = {
    categoryList: CategoryNavItem[]
  }

  export type CategoryByUrlKeyData = {
    categoryList: CategoryNavItem[]
  }