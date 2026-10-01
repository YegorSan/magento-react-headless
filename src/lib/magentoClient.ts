type GraphQlError = {
  message: string
}

type GraphQlEnvelope<T> = {
  data?: T | null
  errors?: GraphQlError[]
}

export async function graphql<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  const json = (await response.json()) as GraphQlEnvelope<T>

  if (json.errors?.length) {
    throw new Error(json.errors.map((err) => err.message).join('; '))
  }
  if (json.data === undefined || json.data === null) {
    throw new Error('GraphQL response contains no data')
  }
  return json.data
}
