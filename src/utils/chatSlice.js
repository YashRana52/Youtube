import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        message: []
    },
    reducers: {
        setMessage: (state, action) => {
            state.message.push(action.payload);
            // Keep only the last 20 messages
            if (state.message.length > 20) {
                state.message = state.message.slice(-20);
            }
        }
    }
})

export const { setMessage } = chatSlice.actions;
export default chatSlice.reducer;
