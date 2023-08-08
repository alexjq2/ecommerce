import { createSlice } from '@reduxjs/toolkit';
import getConfig from "../../utils/getConfig"
import axios from 'axios';
import { setIsLoader } from './isLoader.slice';

export const shoppingCart = createSlice({
    name: 'shoppingCart',
    initialState: [],
    reducers: {
        addItemToCart : (state, action) => {
            return action.payload
        }
    }
})

export const getFavoriteThunk = () => dispatch => {
    dispatch(setIsLoader(true))
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
      .then(resp=> dispatch(addItemToCart(resp.data)))
      .catch(error=> console.error(error))
      .finally(()=> dispatch(setIsLoader(false)))
}

export const sendCartThunk = data => dispatch => {
    dispatch(setIsLoader(true))
    axios 
      .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data , getConfig())
      .then(() => dispatch(getFavoriteThunk()))
      .catch(error => console.error(error))
      .finally(() => dispatch(setIsLoader(false)))
}
export const { addItemToCart } = shoppingCart.actions;

export default shoppingCart.reducer;
