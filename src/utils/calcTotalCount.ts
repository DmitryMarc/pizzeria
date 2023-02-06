import { CartItemType } from "../redux/cart/cartTypes";

export const calcTotalCount = (items: CartItemType[]) => {
    return items.reduce((sum, item) => {
        return item.count + sum;
    }, 0)
}
