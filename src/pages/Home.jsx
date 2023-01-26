import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort, { listSort } from '../components/Sort';
import Preloader from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';
import { useRef } from 'react';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [orderType, setOrderType] = useState(true);

    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const searchValue = useSelector(state => state.filter.searchValue);
    const currentPage = useSelector(state => state.filter.currentPage);
    const categoryId = useSelector(state => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort);

    const navigate = useNavigate();

    const fetchPizzas = () => {
        setIsLoading(true);
        axios.get(`https://63cae056f36cbbdfc76246cf.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0
            ? `&category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${orderType
                ? 'desc' : 'asc'}${searchValue ? `&search=${searchValue}` : ''}`).then(res => {
                    setItems(res.data);
                    setIsLoading(false);
                }
                )
    }
    // При первом рендере проверяем URL-параметры и сохраняем их в redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = listSort.find(listItem => listItem.sortProperty === params.sortProperty);

            dispatch(setFilters({
                ...params,
                sort
            }));
            isSearch.current = true;
        }
    }, [])
    // Если это не первый рендер, то запрашиваем пиццы.
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;

    }, [categoryId, sortType, orderType, searchValue, currentPage])
    // Эсли изменили параметры и это уже не первый рендер, то вшиваем данные в URL.
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                currentPage,
                categoryId,
                sortProperty: sortType.sortProperty,
                orderType
            })
            navigate(`?${queryString}`)
        }

        isMounted.current = true;
    }, [categoryId, sortType, orderType, currentPage])

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