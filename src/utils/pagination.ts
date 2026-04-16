export type PaginationParams = {
  page: number
  limit: number
  skip: number
}

export const getPaginationParams = (
  pageQuery?: string,
  limitQuery?: string,
  maxLimit = 100
): PaginationParams => {
  const pageValue = Number(pageQuery) || 1
  const limitValue = Number(limitQuery) || 10

  const page = Math.max(1, Math.floor(pageValue))
  const limit = Math.min(maxLimit, Math.max(1, Math.floor(limitValue)))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}
