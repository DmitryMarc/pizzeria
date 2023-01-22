import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort';
import Preloader from '../components/PizzaBlock/Skeleton';


const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://63cae056f36cbbdfc76246cf.mockapi.io/items?category=' + categoryId)
            .then(res => res.json())
            .then(jsonArray => {
                setItems(jsonArray);
                setIsLoading(false);
            })
            window.scrollTo(0, 0);
    }, [categoryId])
    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
                <Sort sortType={sortType} setSortType={setSortType} />
            </div>
            <h2 className="content__title">Все пиццы:</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Preloader key={index} />)
                        : items.map(pizzasItem => {
                            return <PizzaBlock key={pizzasItem.id} {...pizzasItem} />
                        })
                }
            </div>
        </ div>
    )
}

export default Home;