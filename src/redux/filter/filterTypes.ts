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