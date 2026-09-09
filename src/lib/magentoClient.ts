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

export async function graphql<TData>(
  query: string, 
  options: GraphqlOptions = {},
):Promise<TData> {
    const { variables, token } = options

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    
    const response = await fetch('/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables,
        }),
    })

    if (!response.ok) {
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

}