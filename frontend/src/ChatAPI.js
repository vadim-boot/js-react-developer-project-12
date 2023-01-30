import {useEffect} from "react";
import {createContext} from "react";
import io from 'socket.io-client'
import {messageAdd} from "./slices/messageSlice";
import {useDispatch} from "react-redux";

const ApiContext = createContext({});
const socket = io();

const ApiProvider = ({children}) => {

    const dispatch = useDispatch();

    const sendMessage = (message, sendCallback) => {
        socket.emit('newMessage',
            {'body': message, 'channelId': 1, 'username': 'admin'},
            (response) => {
                console.log(`response.status = ${response.status}`);
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
    }, []);

    return (
        <ApiContext.Provider value={{sendMessage}}>
            {children}
        </ApiContext.Provider>
    )
};

export {ApiContext, ApiProvider};