import { createSlice } from '@reduxjs/toolkit';
import getConfig from "../../utils/getConfig"
import axios from 'axios';

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
    
    axios
      .get("https://ecommerce-api-hnfp.onrender.com/cart", getConfig())
      .then(resp=> dispatch(addItemToCart(resp.data)))
      .catch(error=> console.error(error))
      
}

export const sendCartThunk = data => dispatch => {
    
    axios 
      .post("https://ecommerce-api-hnfp.onrender.com/cart", data , getConfig())
      .then(() => dispatch(getFavoriteThunk()))
      .catch(error => console.error(error))
      
}
export const updateFavoriteThunk = (id, newRate) => (dispatch) => {
    
    const body = {
        quantity : newRate
    }
      axios
        .put(`https://ecommerce-api-hnfp.onrender.com/cart/${id}`, body, getConfig())
        .then(() => dispatch(getFavoriteThunk()) )
        .catch(error => console.error(error))
        
}

export const deleteFavoriteThunk = (id) => (dispatch) => {
    
      axios
        .delete(`https://ecommerce-api-hnfp.onrender.com/cart/${id}`, getConfig())
        .then(() => dispatch(getFavoriteThunk()) )
        .catch(error => console.error(error))
        
}


export const { addItemToCart } = shoppingCart.actions;

export default shoppingCart.reducer;
