import {createSlice} from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState = {channels: {}, currentChannelId: null, defaultChannelId: null};

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
        channelRename: (state, action) => {
            const channel = action.payload;
            state.channels[channel.id] = channel;
        },
        setCurrentChannel: (state, action) => {
            state.currentChannelId = action.payload;
        },
        setDefaultChannelId: (state, action) => {
            state.defaultChannelId = action.payload;
        },
        resetCurrentChannelId: (state) => {
            state.currentChannelId = state.defaultChannelId;
        }
    }
});

export const {
    channelAdd,
    channelRemove,
    setCurrentChannel,
    channelRename,
    setDefaultChannelId,
    resetCurrentChannelId
} = channelSlice.actions;

export default channelSlice.reducer;