"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react"
import { cartReducer } from "./cartReducer"
import { CartActionType } from "./cartActions"
import { CartItem, CartState } from "../utils/types"

interface CartContextProps extends CartState {
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  clearCart: () => void
  getCartTotal: () => number
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

const initialState: CartState = {
  cartItems: [],
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    // Load cart from localStorage if available
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart")
      return stored ? { cartItems: JSON.parse(stored) } : init
    }
    return init
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems))
  }, [state.cartItems])

  const addToCart = (item: CartItem) =>
    dispatch({ type: CartActionType.ADD_ITEM, payload: item })

  const removeFromCart = (id: string) =>
    dispatch({ type: CartActionType.REMOVE_ITEM, payload: { id } })

  const incrementItem = (id: string) =>
    dispatch({ type: CartActionType.INCREMENT_ITEM, payload: { id } })

  const decrementItem = (id: string) =>
    dispatch({ type: CartActionType.DECREMENT_ITEM, payload: { id } })

  const clearCart = () => dispatch({ type: CartActionType.CLEAR_CART })

  interface GetCartTotal {
    (): number
  }

  const getCartTotal: GetCartTotal = () =>
    state.cartItems.reduce(
      (total: number, item: CartItem) => total + item.precio * item.quantity,
      0
    )

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
