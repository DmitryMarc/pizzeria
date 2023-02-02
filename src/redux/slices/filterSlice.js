import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType: (state, action) => {
            state.sort = action.payload
        },
        setOrderType: (state, action) => {
            state.orderType = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setFilters(state, action){
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