import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.filter(obj => obj.id.slice(0, id.length) === id);