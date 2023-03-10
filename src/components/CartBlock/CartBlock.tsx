import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCart } from "../../redux/cart/cartSelectors";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";

const CartBlock: FC = () => {
    const { totalPrice, totalCount, items } = useSelector(selectCart);

    if (!totalPrice) {
        return <CartEmpty />
    }

    return (
        <>
            <div className="content__items">
                {
                    items.map((item) => {
                        return <CartItem key={item.id} {...item} />
                    }).reverse()
                }
            </div>
            <div className="cart__bottom">
                <div className="cart__bottom-details">
                    <span> Всего пицц: <b>{totalCount} шт.</b> </span>
                    <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
                </div>
                <div className="cart__bottom-buttons">
                    <Link to="/pizzeria/" className="button button--outline button--add go-back-btn">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span>Вернуться назад</span>
                    </Link>
                    <div className="button pay-btn">
                        <span>Оплатить сейчас</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartBlock;