import { configureStore } from '@reduxjs/toolkit'
import isLoader from './slices/isLoader.slice'
import products from './slices/products.slice'

export default configureStore({
  reducer: {
    isLoader,
    products
	}
})

