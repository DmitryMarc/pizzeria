import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort';
import Preloader from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const searchValue = useSelector(state => state.filter.searchValue);
    const currentPage = useSelector(state => state.filter.currentPage);
    const categoryId = useSelector(state => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort);

    const [orderType, setOrderType] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://63cae056f36cbbdfc76246cf.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0
            ? `&category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${orderType
                ? 'desc' : 'asc'}${searchValue ? `&search=${searchValue}` : ''}`).then(res => {
                    setItems(res.data);
                    setIsLoading(false);
                }
                )
        window.scrollTo(0, 0);
    }, [categoryId, sortType, orderType, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} />
                <Sort sortType={sortType}
                    orderType={orderType} setOrderType={setOrderType} />
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
            <Pagination currentPage={currentPage} />
        </ div>
    )
}

export default Home;