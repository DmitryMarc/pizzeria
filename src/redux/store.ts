import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart/cartSlice'
import filterSlice from './filter/filterSlice'
import pizzasSlice from './pizzas/pizzasSlice'

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizzas: pizzasSlice
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch