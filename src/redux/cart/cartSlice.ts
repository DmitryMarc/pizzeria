
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { CartItemType, CartSliceState } from './cartTypes';

const { items, totalPrice, totalCount } = getCartFromLocalStorage();

const initialState: CartSliceState = {
    totalPrice: totalPrice,
    totalCount: totalCount,
    items: items
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {  
            const findItem = state.items.find(item => item.id.slice(0, action.payload.id.length) === action.payload.id && 
                item.type === action.payload.type && item.size === action.payload.size);
            if (findItem) {
                findItem.count++;
            }
            else {
                let {id, type, size, ...restData} = action.payload
                state.items.push({
                    id: id + type + size,
                    type, 
                    size,
                    ...restData, 
                    count: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id.includes(action.payload))
            if (findItem && findItem.count > 0) {
                findItem.count--;
            }
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
        },
        removeItem(state, action: PayloadAction<string>) { //как-то оптимизировать:
            state.items = state.items.filter(item => item.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
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