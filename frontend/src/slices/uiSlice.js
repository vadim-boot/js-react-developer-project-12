import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

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
        },
        showSuccessToast: (state, action) => {
            toast.success(action.payload);
        },
        showErrorToast: (state, action) => {
            toast.error(action.payload);
        },
    }
})

export const {
    closeModal,
    showAddChannelModal,
    showRenameChannelModal,
    showDeleteChannelModal,
    showSuccessToast,
    showErrorToast,
} = uiSlice.actions;

export default uiSlice.reducer;