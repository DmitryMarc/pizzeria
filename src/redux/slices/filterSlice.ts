import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SortType = {
    name: 'популярности' | 'цене' | 'алфавиту',
    sortProperty: 'rating' | 'price' | 'title'
}

export interface FilterSliceState {
    searchValue: string,
    categoryId: number,
    sort: SortType,
    orderType: boolean,
    currentPage: number
}

export type SetFilterArg = {
    searchValue?: string,
    categoryId: string,
    sort: SortType,
    orderType: string,
    currentPage: string
}

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