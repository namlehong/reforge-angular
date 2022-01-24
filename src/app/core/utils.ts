export const reduceToMap = (a: Map<number, any>, b) => {
  a.set(b.id, b)
  return a
}
