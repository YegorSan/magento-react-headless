type GraphQlError = {
  message: string
}

type GraphQlEnvelope<T> = {
  data?: T | null
  errors?: GraphQlError[]
}

type GraphqlOptions = {
  variables?: Record<string, unknown>
  token?: string | null
}

const RETRYABLE_STATUS = new Set([502, 503, 504])

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export async function graphql<TData>(
  query: string,
  options: GraphqlOptions = {},
): Promise<TData> {
  const { variables, token } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const body = JSON.stringify({
    query,
    variables,
  })

  // Local stack (Vite proxy → Traefik/Varnish/PHP) can flap; retry once on gateway errors.
  const maxAttempts = 2
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers,
        body,
      })

      if (!response.ok) {
        if (RETRYABLE_STATUS.has(response.status) && attempt < maxAttempts) {
          await sleep(300)
          continue
        }
        throw new Error(`HTTP error: ${response.status}`)
      }

      const json = (await response.json()) as GraphQlEnvelope<TData>

      if (json.errors?.length) {
        throw new Error(json.errors.map((err) => err.message).join('; '))
      }

      if (json.data === undefined || json.data === null) {
        throw new Error('GraphQL response contains no data')
      }

      return json.data as TData
    } catch (e) {
      lastError = e instanceof Error ? e : new Error('Unknown error')
      const isNetwork =
        lastError.message.includes('Failed to fetch') ||
        lastError.message.includes('NetworkError')
      if (isNetwork && attempt < maxAttempts) {
        await sleep(300)
        continue
      }
      throw lastError
    }
  }

  throw lastError ?? new Error('GraphQL request failed')
}
