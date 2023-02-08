import { SortType } from "../filter/filterTypes"

export type FetchPizzasArgs = {
    categoryId: number,
    sortType: SortType,
    orderType: boolean,
    searchValue: string,
    currentPage: number
}

export type PizzaType = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    types: number[],
    sizes: number[],
    defaultPrice: number,
    defaultSize: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface PizzaSliceState {
    items: PizzaType[],
    status: Status
}