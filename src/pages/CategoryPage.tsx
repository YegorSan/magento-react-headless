import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { graphql } from '../lib/magentoClient'
import { rewriteMagentoHtml } from '../lib/rewriteMagentoHtml'
import { PRODUCTS_BY_CATEGORY_QUERY } from '../graphql/products'
import { CMS_BLOCKS_QUERY } from '../graphql/cms'
import { CATEGORY_BY_URL_KEY_QUERY } from '../graphql/categories'
import type { ProductListItem, ProductsData } from '../types/products'
import type { CategoryByUrlKeyData, CategoryNavItem } from '../types/category'
import { CATEGORY_CMS_BLOCKS, type CmsBlock, type CmsBlocksData } from '../types/cms'
import { ProductCard } from '../components/ProductCard'
import './Home.css'
import './CategoryPage.css'

export function CategoryPage() {
  const { urlKey } = useParams()
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [category, setCategory] = useState<CategoryNavItem | null>(null)
  const [cmsBlocks, setCmsBlocks] = useState<CmsBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!urlKey) {
        setError('Missing category url key')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      setCmsBlocks([])
      setProducts([])

      try {
        const categoryData = await graphql<CategoryByUrlKeyData>(
          CATEGORY_BY_URL_KEY_QUERY,
          { urlKey },
        )
        if (cancelled) return

        const found = categoryData.categoryList[0]
        if (!found) {
          throw new Error('Category not found')
        }
        setCategory(found)

        const identifiers = [
          ...(found.cms_block?.identifier ? [found.cms_block.identifier] : []),
          ...(CATEGORY_CMS_BLOCKS[urlKey] ?? []),
        ]
        const uniqueIds = [...new Set(identifiers)]

        if (uniqueIds.length > 0) {
          const blocksData = await graphql<CmsBlocksData>(CMS_BLOCKS_QUERY, {
            identifiers: uniqueIds,
          })
          if (cancelled) return
          setCmsBlocks(
            (blocksData.cmsBlocks.items ?? []).filter(
              (block): block is CmsBlock => Boolean(block?.content),
            ),
          )
        }

        const categoryIds = [
          String(found.id),
          ...(found.children?.map((child) => String(child.id)) ?? []),
        ]

        const productsData = await graphql<ProductsData>(PRODUCTS_BY_CATEGORY_QUERY, {
          categoryIds,
        })
        if (cancelled) return

        setProducts(productsData.products.items)
      } catch (e) {
        if (cancelled) return
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [urlKey])

  if (loading) return <p>Loading category…</p>
  if (error) return <p>Error: {error}</p>

  const hasCms = cmsBlocks.length > 0
  const hasProducts = products.length > 0

  return (
    <section className="plp category-page">
      <h1 className="plp__title">{category?.name ?? urlKey}</h1>

      {category?.description ? (
        <div
          className="category-page__description"
          dangerouslySetInnerHTML={{ __html: rewriteMagentoHtml(category.description) }}
        />
      ) : null}

      {hasCms ? (
        <div className="category-page__cms">
          {cmsBlocks.map((block) => (
            <div
              key={block.identifier}
              className={`category-page__cms-block category-page__cms-block--${block.identifier}`}
              dangerouslySetInnerHTML={{
                __html: rewriteMagentoHtml(block.content ?? ''),
              }}
            />
          ))}
        </div>
      ) : null}

      {hasProducts ? (
        <ul className="plp__grid">
          {products.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </ul>
      ) : null}

      {!hasCms && !hasProducts ? (
        <p className="plp__empty">No products or CMS content in this category.</p>
      ) : null}
    </section>
  )
}
