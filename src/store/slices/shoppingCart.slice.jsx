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
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
      .then(resp=> dispatch(addItemToCart(resp.data)))
      .catch(error=> console.error(error))
      
}

export const sendCartThunk = data => dispatch => {
    
    axios 
      .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data , getConfig())
      .then(() => dispatch(getFavoriteThunk()))
      .catch(error => console.error(error))
      
}
export const updateFavoriteThunk = (id, newRate) => (dispatch) => {
    
    const body = {
        quantity : newRate
    }
      axios
        .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfig())
        .then(() => dispatch(getFavoriteThunk()) )
        .catch(error => console.error(error))
        
}

export const deleteFavoriteThunk = (id) => (dispatch) => {
    
      axios
        .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(getFavoriteThunk()) )
        .catch(error => console.error(error))
        
}


export const { addItemToCart } = shoppingCart.actions;

export default shoppingCart.reducer;
