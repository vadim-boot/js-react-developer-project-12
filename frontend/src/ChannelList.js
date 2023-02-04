import {useSelector, useDispatch} from "react-redux";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import React from "react";
import {PlusSquare} from "react-bootstrap-icons";
import {setCurrentChannel} from "./slices/channelSlice";
import {showAddChannelModal, showRenameChannelModal, showDeleteChannelModal} from './slices/uiSlice'
import {useTranslation} from "react-i18next";

const Channel = ({
                     channel,
                     isCurrent,
                     handleChoose,
                     handleRemove,
                     handleRename,
                     t
                 }) => {
    const variant = isCurrent ? 'secondary' : null;

    return (
        channel.removable ?
            (<Dropdown as={ButtonGroup} className="d-flex">
                    <Button
                        type="button"
                        key={channel.id}
                        className="w-100 rounded-0 text-start text-truncate"
                        onClick={handleChoose}
                        variant={variant}
                    >
                        <span className="me-1">#</span>
                        {channel.name}
                    </Button>
                    <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
                        <span className="visually-hidden">{t('chat.channelList.manage')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleRemove(channel)}>{t('chat.channelList.delete')}</Dropdown.Item>
                        <Dropdown.Item onClick={handleRename(channel)}>{t('chat.channelList.rename')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
            : (
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
    )
};

const ChannelList = () => {

    const dispatch = useDispatch();
    const {channels, currentChannelId} = useSelector(state => state.channelsInfo);
    const {t} = useTranslation();

    const channelsArray = Object.values(channels);

    const handleChooseChannel = (channelId) => () => {
        dispatch(setCurrentChannel(channelId));
    };

    const handleAddChannel = () => {
        dispatch(showAddChannelModal());
    };
    const handleRemoveChannel = (channel) => () => {
        dispatch(showDeleteChannelModal(channel))
    };
    const handleRenameChannel = (channel) => () => {
        dispatch(showRenameChannelModal(channel))
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>{t('chat.channelList.head')}</span>
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
                        t={t}
                    />
                ))}
            </ul>
        </>
    )
}

export default ChannelList;