export const isObject = (value: unknown): value is Record<PropertyKey, unknown> => {
  return value !== null && typeof value === 'object'
}
