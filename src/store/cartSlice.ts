import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Dish } from '../types'

type CartState = {
  items: Dish[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Dish>) {
      state.items.push(action.payload)
    },
    removeItem(state, action: PayloadAction<number>) {
      const id = action.payload
      const idx = state.items.findIndex((i) => i.id === id)
      if (idx !== -1) state.items.splice(idx, 1)
    },
    clearCart(state) {
      state.items = []
    }
  }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
