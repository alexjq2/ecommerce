import { createSlice } from '@reduxjs/toolkit';

export const isLoaderSlice = createSlice({
    name: 'loader',
    initialState: false,
    reducers: {
        setIsLoader : (state, action) => {
            return action.payload
        }
    }
})

export const { setIsLoader } = isLoaderSlice.actions;

export default isLoaderSlice.reducer;
