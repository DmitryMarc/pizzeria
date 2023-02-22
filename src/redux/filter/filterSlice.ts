import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, SetFilterArg, SortType } from './filterTypes'

const initialState:FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    },
    orderType: true,
    currentPage: 1
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action:PayloadAction<number>) {
            state.categoryId = action.payload
            if (state.currentPage > 1) {
                state.currentPage = 1;
            }
            if (action.payload && state.searchValue) {
                state.searchValue = '';
            }
        },
        setSortType: (state, action:PayloadAction<SortType>) => {
            state.sort = action.payload
        },
        setOrderType: (state, action:PayloadAction<boolean>) => {
            state.orderType = action.payload
        },
        setCurrentPage: (state, action:PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSearchValue: (state, action:PayloadAction<string>) => {
            state.searchValue = action.payload;
            if (state.currentPage > 1) {
                state.currentPage = 1;
            }
            state.categoryId = 0;
            state.sort = {
                name: 'популярности',
                sortProperty: 'rating'
            }
        },
        setFilters(state, action:PayloadAction<SetFilterArg>){
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sort = action.payload.sort
        }
    },
})

export const { setCategoryId, setSortType,
    setCurrentPage, setSearchValue, setFilters,
    setOrderType } = filterSlice.actions

export default filterSlice.reducer