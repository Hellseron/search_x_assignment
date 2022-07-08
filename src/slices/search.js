import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        recentRequests: [],
    },
    reducers: {
        addNewSearch: (state, action) => {
            const recentSet = new Set(state.recentRequests)
            recentSet.add(action.payload)
            state.recentRequests = Array.from(recentSet)
        },
        removeItem: (state, action)=>{
            const recentSet = new Set(state.recentRequests)
            recentSet.delete(action.payload)
            state.recentRequests = Array.from(recentSet)
        }
    }
})

export const { addNewSearch, removeItem } = searchSlice.actions

export default searchSlice.reducer