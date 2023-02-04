import {useContext, useEffect} from "react";
import {createContext} from "react";
import io from 'socket.io-client'
import {messageAdd} from "./slices/messageSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    channelAdd,
    setCurrentChannel,
    channelRename,
    channelRemove,
    resetCurrentChannelId,
} from "./slices/channelSlice";
import AuthContext from "./contexts/AuthContext";
import {showSuccessToast} from "./slices/uiSlice";
import {useTranslation} from "react-i18next";
import filter from 'leo-profanity'

const ApiContext = createContext({});
const socket = io();

filter.clearList()
filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));

const ApiProvider = ({children}) => {

    const dispatch = useDispatch();
    const currentChannelId = useSelector(state => state.channelsInfo.currentChannelId);
    const auth = useContext(AuthContext);
    const {t} = useTranslation();

    const sendMessage = (message, sendCallback) => {
        socket.emit('newMessage',
            {'body': filter.clean(message), 'channelId': currentChannelId, 'username': auth.currUser.username},
            (response) => {
                if (response.status === 'ok') {
                    sendCallback();
                }
            });
    };

    const addChannel = (name) => {
        socket.emit('newChannel', {name}, ({status, data: {id}}) => {
            if (status === 'ok') {
                dispatch(setCurrentChannel(id));
                dispatch(showSuccessToast(t('toast.channelAdded')))
            }
        });
    }

    const renameChannel = (channel) => {
        socket.emit('renameChannel', channel, ({status}) => {
            if (status === 'ok') {
                dispatch(showSuccessToast(t('toast.channelRenamed')));
            }
        });
    }

    const deleteChannel = (channel) => {
        if (channel.id === currentChannelId) {
            dispatch(resetCurrentChannelId());
        }
        socket.emit('removeChannel', {id: channel.id}, ({status}) => {
            if (status === 'ok') {
                dispatch(showSuccessToast(t('toast.channelDeleted')));
            }
        });
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