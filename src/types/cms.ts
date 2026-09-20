export type CmsBlock = {
  identifier: string
  title?: string | null
  content?: string | null
}

export type CmsBlocksData = {
  cmsBlocks: {
    items: Array<CmsBlock | null>
  }
}

export const CATEGORY_CMS_BLOCKS: Record<string, string[]> = {
  sale: ['sale-left-menu-block', 'sale-block'],
  'what-is-new': ['new-left-menu-block', 'new-block'],
}
