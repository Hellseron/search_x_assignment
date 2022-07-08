import { configureStore } from '@reduxjs/toolkit'
import searchSlice from "../slices/search";

export default configureStore({
    reducer: {
        searchSlice
    },
})