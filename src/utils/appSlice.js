import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        open: true,
        vedio: [],
        category: "All",
        searchSuggestion: []
    },
    reducers: {
        toggleSidebar: (state) => {
            state.open = !state.open;
        },
        setHomeVedio: (state, action) => {
            state.vedio = action.payload;

        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setSearchSuggestion: (state, action) => {
            state.searchSuggestion = action.payload
        }
    }
})
export const { toggleSidebar, setCategory, setHomeVedio, setSearchSuggestion } = appSlice.actions;
export default appSlice.reducer;