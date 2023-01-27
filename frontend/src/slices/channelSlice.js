import {createSlice} from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState = {};

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        channelAdd: (state, action) => {
            const {channel} = action.payload;
            state[channel.id] = channel;
        },
        channelRemove: (state, action) => {
            const {id} = action.payload;
            state = _.omit(state, [id]);
        }
    }
});

export const {channelAdd, channelRemove} = channelSlice.actions;
export default channelSlice.reducer;