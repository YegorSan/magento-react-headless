import { useEffect, useState } from 'react'
import { graphql } from './lib/magentoClient'
import './App.css'

function App() {
  const [storeName, setStoreName] = useState('Magento API is loading...')
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        type StoreConfigData = {
          storeConfig: {
            store_name: string
          }
        }
        const data = await graphql<StoreConfigData>(`
        {
          storeConfig {
            store_name
          }
        }
      `)

        setStoreName(data.storeConfig.store_name)

      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        } else {
          setError('Unknown error')
        }
      }
    }
    load()
  }, [])

  return (
    <>
      <h1>Magento + React</h1>
      {error && <p>Помилка: {error}</p>}
      <p>Магазин: {storeName}</p>
    </>
  )
}

export default App
