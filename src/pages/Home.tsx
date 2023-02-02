import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Preloader from '../components/PizzaBlock/Skeleton';
import Sort, { listSort } from '../components/Sort';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { selectPizzas } from '../redux/slices/selectors/pizzasSelectors';

import {
    selectCategoryId, selectCurrentPage,
    selectOrderType, selectSearchValue,
    selectSortType
} from '../redux/slices/selectors/filterSelectors';
import { FC } from 'react';

const Home:FC = () => {
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const searchValue = useSelector(selectSearchValue);
    const orderType = useSelector(selectOrderType);
    const currentPage = useSelector(selectCurrentPage);
    const categoryId = useSelector(selectCategoryId);
    const sortType = useSelector(selectSortType);
    const { items, status } = useSelector(selectPizzas);


    const navigate = useNavigate();

    const getPizzas = async () => {
        // setIsLoading(true);
        try { //@ts-ignore
            dispatch(fetchPizzas({
                categoryId,
                sortType,
                orderType,
                searchValue,
                currentPage
            }));
            // setIsLoading(false);
        }
        catch (error) {
            // setIsLoading(false);
            console.log('ERROR', error);
            alert('Ошибка при получении пицц');
        }
        finally {
            // setIsLoading(false);
        }
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
            getPizzas();
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
                    orderType={orderType} />
            </div>
            {status === 'error'
                ?
                <div className="content__error-info">
                    <h2>Произошла ошибка</h2>
                    <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                </div>
                :
                <>
                    <h2 className="content__title">Все пиццы:</h2>
                    <div className="content__items">
                        {
                            status === 'loading'
                                ? [...new Array(6)].map((_, index) => <Preloader key={index} />)
                                : items.map((pizzasItem:any) => {
                                    return <PizzaBlock key={pizzasItem.id} {...pizzasItem} />
                                })
                        }
                    </div>
                </>
            }
            <Pagination currentPage={currentPage} />
        </ div>
    )
}

export default Home;