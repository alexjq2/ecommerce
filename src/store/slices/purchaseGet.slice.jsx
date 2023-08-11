import { createSlice } from '@reduxjs/toolkit';
import { setIsLoader } from './isLoader.slice';
import getConfig from '../../utils/getConfig';
import { getFavoriteThunk } from './shoppingCart.slice';
import axios from 'axios';
const purchaseGet = createSlice({
  name: 'purchaseGet',
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    },
  },
});

export const getPurchaseThunk = () => (dispatch) => {
    dispatch(setIsLoader(true))

    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())
      .then(resp => dispatch(setPurchases(resp.data)))
      .catch(error => console.log(error))
      .finally(dispatch(setIsLoader(false))) 
}

export const buyThunk = () => (dispatch) => {
    dispatch(setIsLoader(true))
    axios
      .post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {},getConfig())
      .then(() => {
        dispatch(getPurchaseThunk())
        dispatch(getFavoriteThunk())
    })
      .catch(error => console.error(error))
      .finally(() => dispatch(setIsLoader(false)))
}

export const { setPurchases } = purchaseGet.actions;

export default purchaseGet.reducer;