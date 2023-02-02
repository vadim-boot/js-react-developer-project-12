import {configureStore} from '@reduxjs/toolkit';
import channelReducer from './channelSlice';
import messageReducer from './messageSlice';
import uiReducer from './uiSlice';

export default configureStore({
    reducer: {
        channelsInfo: channelReducer,
        message: messageReducer,
        ui: uiReducer
    },
});