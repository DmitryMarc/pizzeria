import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchPizzasArgs, PizzaType } from "./pizzasTypes";

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