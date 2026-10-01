import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/Home'
import { AboutPage } from './pages/About'
import { ProductPage } from './pages/ProductPage'
import { CategoryPage } from './pages/CategoryPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="product/:urlKey" element={<ProductPage />} />
        <Route path="category/:urlKey" element={<CategoryPage />} />
      </Route>
    </Routes>
  )
}