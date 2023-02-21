import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Preloader from '../components/PizzaBlock/Skeleton';
import Sort, { listSort } from '../components/Sort';
import { setFilters } from '../redux/filter/filterSlice';
import { selectPizzas } from '../redux/pizzas/pizzasSelectors';
import { FC } from 'react';
// import {v1} from 'uuid';
// import uuid from 'react-uuid';
import {
    selectCategoryId, selectCurrentPage,
    selectOrderType, selectSearchValue,
    selectSortType
} from '../redux/filter/filterSelectors';
import { useAppDispatch } from '../redux/store';
import { SetFilterArg } from '../redux/filter/filterTypes';
import { fetchPizzas } from '../redux/pizzas/asyncActions';

const Home: FC = () => {
    const dispatch = useAppDispatch();
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
        try {
            dispatch(fetchPizzas({
                categoryId,
                sortType,
                orderType,
                searchValue,
                currentPage
            }));
        }
        catch (error) {
            console.log('ERROR', error);
            alert('Ошибка при получении пицц');
        }
    }
    // При первом рендере проверяем URL-параметры и сохраняем их в redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = listSort.find(listItem => listItem.sortProperty === params.sortProperty);
            dispatch(setFilters({
                ...params,
                sort: sort || listSort[0]
            } as SetFilterArg));
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
                    {!!items.length && <h2 className="content__title">Все пиццы:</h2>}
                    {!items.length && status === 'success' && <h2 className="content__title">Ничего нет :(</h2>}
                    <div className="content__items">
                        {
                            status === 'loading'
                                ? [...new Array(4)].map((_, index) => <Preloader key={index} />)
                                : items.map((pizzasItem) => {
                                    return <PizzaBlock key={pizzasItem.id} {...pizzasItem} />
                                })
                        }
                    </div>
                </>
            }
            {((items.length === 4) || (!!items.length && currentPage > 1)) &&
                <Pagination currentPage={currentPage} arrayLength={items.length} />
            }   
        </ div>
    )
}

export default Home;