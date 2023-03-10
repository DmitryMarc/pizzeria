import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItemById, selectCartItems } from "../../redux/cart/cartSelectors";
import { addItem } from "../../redux/cart/cartSlice";
import { CartItemType } from "../../redux/cart/cartTypes";
import { setPrice } from "../../redux/pizzas/pizzasSlice";
import { calcTotalCount } from "../../utils/calcTotalCount";

const typesNames = ['тонкое', 'традиционное'];

type PizzaBlockPropsType = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    types: number[],
    sizes: number[]
}

const PizzaBlock: FC<PizzaBlockPropsType> = React.memo(
    ({ id, title, price, imageUrl, types, sizes }) => {

        const currentCartItem = useSelector(selectCartItemById(id));
        const cartItems = useSelector(selectCartItems);
        const [activeType, setActiveType] = useState(0);
        const [activeSize, setActiveSize] = useState(0);
        const [addedCount, setAddedCount] = useState(calcTotalCount(currentCartItem));
        const dispatch = useDispatch();

        useEffect(() => {
            setAddedCount(calcTotalCount(currentCartItem));
        }, [cartItems])

        const onClickSlectedType = (index: number) => {
            setActiveType(index);
            dispatch(setPrice({
                id: id,
                type: index,
                size: sizes[activeSize]
            }));
        }
        const onClickSlectedSize = (index: number) => {
            setActiveSize(index);
            dispatch(setPrice({
                id: id,
                type: activeType,
                size: sizes[index]
            }));
        }
        const onClickAdd = () => {
            const item: CartItemType = {
                id,
                title,
                price,
                imageUrl,
                type: typesNames[activeType],
                size: sizes[activeSize],
                count: 0
            }
            dispatch(addItem(item));
        }
        return (
            <div className="pizza-block-wrapper">
                <div className="pizza-block">
                    <Link to={`/pizzeria/pizza/${id}`}>
                        <img
                            className="pizza-block__image"
                            src={imageUrl}
                            alt="Pizza"
                        />
                        <h4 className="pizza-block__title">{title}</h4>
                    </Link>
                    <div className="pizza-block__selector">
                        <ul>
                            {
                                types.map((type, index) => (
                                    <li onClick={() => onClickSlectedType(index)} key={type}
                                        className={activeType === index ? "active" : ''}>{typesNames[type]}</li>
                                ))
                            }
                        </ul>
                        <ul>
                            {
                                sizes.map((size, index) => (
                                    <li onClick={() => onClickSlectedSize(index)} key={size}
                                        className={activeSize === index ? "active" : ''}>{size} см.</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">{price} ₽</div>
                        <button onClick={onClickAdd} className="button button--outline button--add">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 
                                4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 
                                7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 
                                10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Добавить</span>
                            {addedCount > 0 && <i>{addedCount}</i>}
                        </button>
                    </div>
                </div>
            </div>
        )
    })

export default PizzaBlock;