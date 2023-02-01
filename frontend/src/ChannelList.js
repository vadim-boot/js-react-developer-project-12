import {useSelector, useDispatch} from "react-redux";
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
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

const ChannelListOld = () => {
    const channels = useSelector(state => state.channelsInfo.channels);
    const currentChanelId = useSelector(state => state.channelsInfo.currentChannelId);

    const navItems = Object.entries(channels).map(([k, v]) => {

        const channelBtn = k === currentChanelId
            ? 'w-100 rounded-0 text-start text-truncate btn-secondary'
            : 'w-100 rounded-0 text-start text-truncate';

        const channelDropBtn = k === currentChanelId
            ? 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary'
            : 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn';

        return (
            <Nav.Item key={k} className="w-100">
                <div role="group" className="d-flex dropdown btn-group">
                    <Nav.Link eventKey={k}><span className="me-1">#</span>{v.name}</Nav.Link>
                    {/*
                    <Button eventKey={k} className={channelBtn} variant="">
                        <span className="me-1">#</span>{v.name}
                    </Button>
*/}
                    <button type="button" id="react-aria8987031047-2" aria-expanded="false"
                            className={channelDropBtn}><span
                        className="visually-hidden">Управление каналом</span></button>
                    <div x-placement="bottom-start" aria-labelledby="react-aria8987031047-2" className="dropdown-menu"
                         data-popper-reference-hidden="false" data-popper-escaped="false"
                         data-popper-placement="bottom-start"
                         style={{
                             position: 'absolute',
                             inset: '0px auto auto 0px',
                             transform: 'translate3d(155.2px, 312.8px, 0px)'
                         }}>
                        <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0"
                           href="#">Удалить</a>
                        <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button"
                           tabIndex="0" href="#">Переименовать</a>
                    </div>
                </div>
            </Nav.Item>
        )
    })

    return (
        <div>
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>Каналы</span>
                <button className="p-0 text-primary btn btn-group-vertical">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"
                         fill="currentColor">
                        <path
                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                    </svg>
                    <span className="visually-hidden">+</span>
                </button>
            </div>
            <Nav variant="pills"
                 className="flex-column nav-pills nav-fill px-2"
            >
                {navItems}
            </Nav>
        </div>
    )
}

export default ChannelList;