# Magento React Headless

Learning / demo storefront: **React + TypeScript + Vite** talking to **Magento 2 GraphQL**.

This is a hands-on lab for modern React against a real Magento backend — not a production Flux-class storefront yet.

## What works

- Product list (home)
- Category pages (`/category/:urlKey`) with parent + children product filter
- Product detail (`/product/:urlKey`) via Magento `route(url: …html)`
- Shared layout + basic Luma-inspired styles
- Vite dev proxy `/graphql` → local Magento

## Stack

| Layer | Choice |
|--------|--------|
| UI | React 19, TypeScript |
| Bundler | Vite |
| Routing | react-router-dom |
| API | Magento GraphQL (`fetch` helper in `src/lib/magentoClient.ts`) |
| Backend | Magento 2.4.x (local Warden: `https://app.magento-headless.test`) |

## Prerequisites

- Node.js 20+ (or current LTS)
- Running Magento with GraphQL enabled and sample data (or your catalog)
- Dev proxy target in [`vite.config.ts`](vite.config.ts) pointed at your Magento base URL

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

GraphQL calls go to `/graphql` and are proxied to Magento (see `server.proxy` in `vite.config.ts`). Change `target` if your Magento host differs.

```bash
npm run build    # production build
npm run preview  # serve the build locally
```

## Project layout

```text
src/
  components/   # Layout, MainNav, ProductCard
  pages/        # ProductListPage, CategoryPage, ProductPage
  graphql/      # Query strings
  types/        # TypeScript types for GraphQL data
  lib/          # magentoClient (fetch + basic 502 retry)
```

## Roadmap (honest)

- [x] Catalog: PLP, category, PDP
- [ ] Stronger nav (dropdown / mobile)
- [ ] Next.js + SSR for Core Web Vitals (main headless performance story)
- [ ] Cart / checkout via Magento GraphQL

## Notes

- Client-only SPA: first paint waits on JS + GraphQL. Lighthouse on `vite dev` will look weak; measure `build` + `preview` if you care about scores.
- Local Magento (Traefik/Varnish) can return intermittent 502 through the Vite proxy; the client retries gateway errors once.

## License

Private learning project for now (`private: true` in `package.json`).
