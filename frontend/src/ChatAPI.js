import {useEffect} from "react";
import {createContext} from "react";
import io from 'socket.io-client'
import {messageAdd} from "./slices/messageSlice";
import {useDispatch, useSelector} from "react-redux";

const ApiContext = createContext({});
const socket = io();

const ApiProvider = ({children}) => {

    const dispatch = useDispatch();
    const currentChannelId = useSelector(state => state.channelsInfo.currentChannelId);

    const sendMessage = (message, sendCallback) => {
        socket.emit('newMessage',
            {'body': message, 'channelId': currentChannelId, 'username': 'admin'},
            (response) => {
                if (response.status === 'ok') {
                    sendCallback();
                }
            });
    };

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected!');
        });

        socket.on("newMessage", (message) => {
            dispatch(messageAdd(message));
        });

        return () => {
            socket.off('connect');
            socket.off('newMessage')
        };
    }, [dispatch]);

    return (
        <ApiContext.Provider value={{sendMessage}}>
            {children}
        </ApiContext.Provider>
    )
};

export {ApiContext, ApiProvider};