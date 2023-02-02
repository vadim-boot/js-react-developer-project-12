import {useEffect} from "react";
import {createContext} from "react";
import io from 'socket.io-client'
import {messageAdd} from "./slices/messageSlice";
import {useDispatch, useSelector} from "react-redux";
import {channelAdd,
    setCurrentChannel,
    channelRename,
    channelRemove,
    resetCurrentChannelId} from "./slices/channelSlice";

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

    const addChannel = (name) => {
        socket.emit('newChannel', {name}, ({data: {id}}) => {
            dispatch(setCurrentChannel(id));
        });
    }

    const renameChannel = (channel) => {
        socket.emit('renameChannel', channel);
    }

    const deleteChannel = (channel) => {
        if (channel.id === currentChannelId) {
            dispatch(resetCurrentChannelId());
        }
        socket.emit('removeChannel', {id: channel.id});
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected!');
        });

        socket.on("newMessage", (message) => {
            dispatch(messageAdd(message));
        });

        socket.on('newChannel', (channel) => {
            dispatch(channelAdd(channel))
        })

        socket.on('renameChannel', channel => {
            dispatch(channelRename(channel));
        })

        socket.on('removeChannel', ({id}) => {
            dispatch(channelRemove(id));
        })

        return () => {
            socket.off('connect');
            socket.off('newMessage');
            socket.off('newChannel');
            socket.off('renameChannel')
            socket.off('removeChannel')
        };
    }, [dispatch]);

    return (
        <ApiContext.Provider value={{sendMessage, addChannel, renameChannel, deleteChannel}}>
            {children}
        </ApiContext.Provider>
    )
};

export {ApiContext, ApiProvider};