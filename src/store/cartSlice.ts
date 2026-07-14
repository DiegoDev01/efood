import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Dish } from '../types'

const STORAGE_KEY = 'efood-cart'

type CartState = {
  items: Dish[]
  isOpen: boolean
}

const loadInitialState = (): CartState => {
  if (typeof window === 'undefined') {
    return { items: [], isOpen: false }
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return { items: [], isOpen: false }
    }

    const parsed = JSON.parse(stored) as Partial<CartState>
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      isOpen: Boolean(parsed.isOpen),
    }
  } catch {
    return { items: [], isOpen: false }
  }
}

const persistCart = (state: CartState) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items, isOpen: state.isOpen }))
  }
}

const initialState: CartState = loadInitialState()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Dish>) {
      state.items.push(action.payload)
      persistCart(state)
    },
    removeItem(state, action: PayloadAction<number>) {
      const id = action.payload
      const idx = state.items.findIndex((i) => i.id === id)
      if (idx !== -1) state.items.splice(idx, 1)
      persistCart(state)
    },
    clearCart(state) {
      state.items = []
      persistCart(state)
    },
    openCart(state) {
      state.isOpen = true
      persistCart(state)
    },
    closeCart(state) {
      state.isOpen = false
      persistCart(state)
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen
      persistCart(state)
    },
  },
})

export const { addItem, removeItem, clearCart, openCart, closeCart, toggleCart } = cartSlice.actions
export default cartSlice.reducer
