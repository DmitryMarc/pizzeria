import { RootState } from "../store";

export const selectSearchValue = (state: RootState) => state.filter.searchValue;

export const selectOrderType = (state: RootState) => state.filter.orderType;

export const selectCurrentPage = (state: RootState) => state.filter.currentPage;

export const selectCategoryId = (state: RootState) => state.filter.categoryId;

export const selectSortType = (state: RootState) => state.filter.sort;
