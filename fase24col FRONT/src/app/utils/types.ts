export interface CartItem {
  id: string
  name: string
  precio: number
  imagen: string
  quantity: number
}

export interface CartState {
  cartItems: CartItem[]
}
