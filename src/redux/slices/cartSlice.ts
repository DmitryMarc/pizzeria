import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItemType = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,
    count: number
}

export interface CartSliceState {
    totalPrice: number,
    totalCount: number,
    items: CartItemType[]
}

const initialState: CartSliceState = {
    totalPrice: 0,
    totalCount: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(item => item.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            }
            else {
                state.items.push({
                    ...action.payload, count: 1
                });
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.price * item.count) + sum;
            }, 0)

            state.totalCount = state.items.reduce((sum, item) => {
                return item.count + sum;
            }, 0)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)
            if (findItem && findItem.count > 0) {
                findItem.count--;
            }

        },
        removeItem(state, action: PayloadAction<string>) { //как-то оптимизировать:
            state.items = state.items.filter(item => item.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.price * item.count) + sum;
            }, 0)
            state.totalCount = state.items.reduce((sum, item) => {
                return item.count + sum;
            }, 0)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        },
    },
})

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer