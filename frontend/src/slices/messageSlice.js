import {createSlice} from "@reduxjs/toolkit";
import {channelRemove} from './channelSlice';
import _ from 'lodash';

const initialState = {};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        messageAdd: (state, action) => {
            const message = action.payload;
            state[message.id] = message;
        },
        messageRemove: (state, action) => {
            const id = action.payload;
            state = _.omit(state, [id]);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(channelRemove, (state, action) => {
            const channelId = action.payload;
            state = _.omitBy(state, (v, k) => v.channelId === channelId)
            return state;
        })
    }
});

export const {messageAdd, messageRemove} = messageSlice.actions;
export default messageSlice.reducer;