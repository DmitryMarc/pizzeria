import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SortType } from './filterSlice';

type FetchPizzasArgs = {
    categoryId: number,
    sortType: SortType,
    orderType: boolean,
    searchValue: string,
    currentPage: number
}

type PizzaType = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    types: number[],
    sizes: number[]
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaType[],
    status: Status
}


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
}

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params: FetchPizzasArgs) => {
        const { categoryId, sortType, orderType, searchValue, currentPage } = params;
        const response = await axios.get<PizzaType[]>(`https://63cae056f36cbbdfc76246cf.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0
            ? `&category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${orderType
                ? 'desc' : 'asc'}${searchValue ? `&search=${searchValue}` : ''}`);
        return response.data;
    }
)

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action:PayloadAction<PizzaType[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING
            state.items = [];
            console.log('Идёт отправка');
        }),
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
            console.log(state, 'Всё ОК');
        }),
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
            console.log('Была ошибка');
        })
    }
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer