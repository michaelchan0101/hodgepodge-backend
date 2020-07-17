export interface AdminResponse {
  id: number
  username: string
  createdAt: string
  updatedAt: string
}

export interface AdminLoginResponse {
  token: string
  admin: AdminResponse
}
