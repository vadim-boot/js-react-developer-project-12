import {createSlice} from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState = {};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        messageAdd: (state, action) => {
            const {message} = action.payload;
            state[message.id] = message;
        },
        messageRemove: (state, action) => {
            const {id} = action.payload;
            state = _.omit(state, [id]);
        },
    }
});

export const {messageAdd, messageRemove} = messageSlice.actions;
export default messageSlice.reducer;