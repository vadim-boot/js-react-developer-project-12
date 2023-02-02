import {closeModal} from "../slices/uiSlice";
import {useDispatch, useSelector} from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {useContext} from "react";
import {ApiContext} from "../ChatAPI";

const ChannelDelete = () => {
    const dispatch = useDispatch();
    const channelToDelete = useSelector(state => state.ui.currentChannel);
    const {deleteChannel} = useContext(ApiContext)

    const onHide = () => {
        dispatch(closeModal());
    };

    const onDelete = () => {
        dispatch(closeModal());
        deleteChannel(channelToDelete);
    }

    return (
        <Modal
            show
            keyboard={true}
            onEscapeKeyDown={onHide}>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>Удалить канал </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">Уверены?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отменить
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Удалить
                </Button>
            </Modal.Footer>

        </Modal>
    );
}

export default ChannelDelete;