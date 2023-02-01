import {useSelector, useDispatch} from "react-redux";
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";
import React from "react";
import {PlusSquare} from "react-bootstrap-icons";
import {setCurrentChannel} from "./slices/channelSlice";

const Channel = ({
                     channel,
                     isCurrent,
                     handleChoose,
                     handleRemove,
                     handleRename,
                 }) => {
    const variant = isCurrent ? 'secondary' : null;

    return (
        <li key={channel.id} className="nav-item w-100">
            <Button
                type="button"
                variant={variant}
                key={channel.id}
                className="w-100 rounded-0 text-start"
                onClick={handleChoose}
            >
                <span className="me-1">#</span>
                {channel.name}
            </Button>
        </li>
    )
};

const ChannelList = () => {

    const dispatch = useDispatch();
    const {channels, currentChannelId} = useSelector(state => state.channelsInfo);

    const channelsArray = Object.entries(channels).map(([k, v]) => v);

    const handleChooseChannel = (channelId) => () => {
        dispatch(setCurrentChannel(channelId));
    };

    const handleAddChannel = () => {
    };
    const handleRemoveChannel = (channelId) => () => {
    };
    const handleRenameChannel = (channelId) => () => {
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>Каналы</span>
                <Button
                    type="button"
                    variant="group-vertical"
                    className="p-0 text-primary"
                    onClick={handleAddChannel}
                >
                    <PlusSquare size={20}/>
                    <span className="visually-hidden">+</span>
                </Button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2">
                {channelsArray.map((channel) => (
                    <Channel
                        key={channel.id}
                        channel={channel}
                        isCurrent={channel.id === currentChannelId}
                        handleChoose={handleChooseChannel(channel.id)}
                        handleRemove={handleRemoveChannel}
                        handleRename={handleRenameChannel}
                    />
                ))}
            </ul>
        </>
    )
}

export default ChannelList;