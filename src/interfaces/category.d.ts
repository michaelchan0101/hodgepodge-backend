export interface CategoryResponse {
  id: number
  name: string
}

export interface CategoryObjResponse {
  [name: string]: CategoryResponse
}
