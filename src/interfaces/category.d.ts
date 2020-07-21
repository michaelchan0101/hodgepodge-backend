export interface CategoryResponse {
  id: number
  name: string
  isShowInMenu: boolean
  sort: nunmber
  createdAt: string
  updatedAt: string
}

export interface CategoryObjResponse {
  [name: string]: CategoryResponse
}

export interface CreateCategoryRequest {
  name: string
  isShowInMenu: boolean
  sort: number
}
