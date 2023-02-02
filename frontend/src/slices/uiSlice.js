import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {modalName: '', currentChannel: null},
    reducers: {
        closeModal: (state) => {
            state.modalName = '';
            state.currentChannel = null;
        },
        showAddChannelModal: (state) => {
            state.modalName = 'addingChannel';
        },
        showRenameChannelModal: (state, action) => {
            state.modalName = 'renamingChannel';
            state.currentChannel = action.payload;
        },
        showDeleteChannelModal: (state, action) => {
            state.modalName = 'deletingChannel';
            state.currentChannel = action.payload;
        }
    }
})

export const {closeModal, showAddChannelModal, showRenameChannelModal, showDeleteChannelModal} = uiSlice.actions;
export default uiSlice.reducer;