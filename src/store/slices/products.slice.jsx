import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoader } from './isLoader.slice';

export const productsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setNews: (state, action) => {
            return action.payload
        }

    }
})

export const getNewsThunk = () => (dispatch) => {
    dispatch(setIsLoader(true))
    axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
    .then(resp => dispatch(setNews(resp.data)))
    .catch(error => console.error(error))
    .finally( () => dispatch(setIsLoader(false)))
};
export const filterNewsThunk = (data) => (dispatch) => {
    dispatch( setIsLoader(true))
    axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${data}`)
    .then(resp => dispatch( setNews(resp.data)))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoader(false)))
}
export const nameCategoryThunk = (data) => (dispatch) => {
    dispatch(setIsLoader(true))
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${data}`)
      .then(resp => dispatch( setNews(resp.data)))
      .catch(error => console.log(error))
      .finally(() => dispatch(setIsLoader(false)))
}

export const { setNews } = productsSlice.actions;

export default productsSlice.reducer;
