import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProductListPage } from './pages/ProductListPage'
import { ProductPage } from './pages/ProductPage'
import { CategoryPage } from './pages/CategoryPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductListPage />} />
        <Route path="product/:urlKey" element={<ProductPage />} />
        <Route path="category/:urlKey" element={<CategoryPage />} />
      </Route>
    </Routes>
  )
}