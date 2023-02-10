import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { PizzaSliceState, PizzaType, Status } from './pizzasTypes';

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaType[]>) {
            state.items = action.payload;
        },
        setPrice(state, action: PayloadAction<{id:string, type:number, size:number}>) {
            const {id, type, size} = action.payload;
            const findItem = state.items.find(item => item.id === id);
            if(findItem){
                findItem.price = Math.ceil(findItem.defaultPrice * (type === 1 ? 1.3 : 1) / findItem.defaultSize * size);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
            console.log('Идёт отправка');
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = [...action.payload].map(item => ( {...item, defaultPrice: item.price, defaultSize: item.sizes[0]}));
            state.status = Status.SUCCESS;
            console.log(state, 'Всё ОК');
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
            console.log('Была ошибка');
        });
    }
})

export const { setItems, setPrice } = pizzasSlice.actions

export default pizzasSlice.reducer