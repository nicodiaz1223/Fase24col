import { API_URL } from "@/app/utils/apiConsts"
import { HTTP_METHODS } from "@/app/utils/frontendConsts"
import { HttpResponse, httpUtil } from "@/app/utils/httpUtil"

export interface Product {
  id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  imagenUrl: string
}

export const ProductService = {
  getAllProducts: async () => {
    const response: HttpResponse<Product[]> = await httpUtil<Product[]>(
      HTTP_METHODS.GET,
      API_URL.PRODUCTS
    )
    return response
  },
  getSingleProduct: async (id: string) => {
    const response: HttpResponse<Product> = await httpUtil<Product>(
      HTTP_METHODS.GET,
      `${API_URL.PRODUCTS}/${id}`
    )
    return response
  },
}
