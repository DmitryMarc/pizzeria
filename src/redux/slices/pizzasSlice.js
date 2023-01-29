import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {categoryId, sortType, orderType, searchValue, currentPage} = params;
        const response = await axios.get(`https://63cae056f36cbbdfc76246cf.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0
                ? `&category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${orderType
                    ? 'desc' : 'asc'}${searchValue ? `&search=${searchValue}` : ''}`);
        return response.data;
    }
)

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = [];
            console.log('Идёт отправка');
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
            console.log(state, 'Всё ОК');
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
            console.log('Была ошибка');
        },
    }
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer