export function rewriteMagentoHtml(html: string): string {
  let out = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')

  out = out.replace(/https?:\/\/[^"'/\s]+\/media\//gi, '/media/')

  out = out.replace(
    /https?:\/\/[^"'/\s]+\/((?:[\w-]+\/)*)([\w-]+)\.html/gi,
    (_match, folders: string, key: string) => {
      return folders ? `/category/${key}` : `/product/${key}`
    },
  )

  return out
}
