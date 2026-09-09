import { useParams } from 'react-router-dom'
export function ProductPage() {
  const { urlKey } = useParams()
  return (
    <section>
      <h1>Product</h1>
      <p>urlKey: {urlKey}</p>
    </section>
  )
}