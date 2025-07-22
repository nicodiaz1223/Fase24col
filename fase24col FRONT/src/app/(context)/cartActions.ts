import { CartItem } from "../utils/types"

export enum CartActionType {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  INCREMENT_ITEM = "INCREMENT_ITEM",
  DECREMENT_ITEM = "DECREMENT_ITEM",
  CLEAR_CART = "CLEAR_CART",
}

export type CartAction =
  | { type: CartActionType.ADD_ITEM; payload: CartItem }
  | { type: CartActionType.REMOVE_ITEM; payload: { id: string } }
  | { type: CartActionType.INCREMENT_ITEM; payload: { id: string } }
  | { type: CartActionType.DECREMENT_ITEM; payload: { id: string } }
  | { type: CartActionType.CLEAR_CART }
