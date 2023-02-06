import { CartItemType } from "../redux/cart/cartTypes";

export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((sum, item) => {
        return (item.price * item.count) + sum;
    }, 0)
}