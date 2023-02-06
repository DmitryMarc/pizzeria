import { CartItemType } from '../redux/cart/cartTypes';
import { calcTotalCount } from './calcTotalCount';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);
    const totalCount = calcTotalCount(items);

    return {
        items: items as CartItemType[],
        totalPrice,
        totalCount
    }
}