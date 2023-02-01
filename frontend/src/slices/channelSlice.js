import {createSlice} from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState = {channels: {}, currentChannelId: null};

const channelSlice = createSlice({
    name: 'channelsInfo',
    initialState,
    reducers: {
        channelAdd: (state, action) => {
            const channel = action.payload;
            state.channels[channel.id] = channel;
        },
        channelRemove: (state, action) => {
            const id = action.payload;
            state.channels = _.omit(state.channels, [id]);
        },
        setCurrentChannel: (state, action) => {
            state.currentChannelId = action.payload;
        }
    }
});

export const {channelAdd, channelRemove, setCurrentChannel} = channelSlice.actions;
export default channelSlice.reducer;