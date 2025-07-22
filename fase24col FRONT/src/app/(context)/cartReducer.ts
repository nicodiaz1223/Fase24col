import { CartState } from "../utils/types"
import { CartAction, CartActionType } from "./cartActions"

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CartActionType.ADD_ITEM: {
      const item = action.payload
      const existing = state.cartItems.find((i) => i.id === item.id)
      if (existing) {
        // If item exists, increase quantity
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        }
      }
      // Else, add new item
      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, quantity: item.quantity }],
      }
    }
    case CartActionType.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.payload.id),
      }
    case CartActionType.INCREMENT_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }
    case CartActionType.DECREMENT_ITEM:
      return {
        ...state,
        cartItems: state.cartItems
          .map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      }
    case CartActionType.CLEAR_CART:
      return { cartItems: [] }
    default:
      return state
  }
}
