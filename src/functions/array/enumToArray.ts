type NonFunctional<T> = T extends Function ? never : T

/**
 * Helper to produce an array of enum values.
 * @param enumeration Enumeration object.
 */
export function enumToArray<T>(enumeration: any): NonFunctional<T[keyof T]>[] {
  return (
    Object.keys(enumeration)
      .filter((key) => isNaN(Number(key)))
      // @ts-ignore TYPE NEEDS FIXING
      .map((key) => enumeration[key])
      .filter((val) => typeof val === 'number' || typeof val === 'string')
  )
}
