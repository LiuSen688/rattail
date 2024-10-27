export function tryParseJSON<T>(json: string): T | undefined {
  try {
    return JSON.parse(json)
  } catch {
    return
  }
}

export function prettyJSONObject(jsonObject: Record<string, any>) {
  return JSON.stringify(jsonObject, null, 2)
}
