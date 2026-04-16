declare namespace Express {
  interface Request {
    requestId?: string
    userId?: string
    userEmail?: string
  }
}
