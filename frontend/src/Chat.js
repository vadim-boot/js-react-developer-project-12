import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {channelAdd, setCurrentChannel, setDefaultChannelId} from "./slices/channelSlice";
import ChannelList from "./ChannelList";
import MessageList from "./MessageList";
import {messageAdd} from "./slices/messageSlice";
import ModalService from "./modals/ModalService";
import AuthContext from "./contexts/AuthContext";
import {useContext} from "react";

const Chat = () => {
    const dispatch = useDispatch();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const headers = {Authorization: `Bearer ${auth.currUser.token}`};
        const fetchContent = async () => {
            const {data} = await axios.get('/api/v1/data', {headers});
            data.channels.forEach((channel) => dispatch(channelAdd(channel)));
            data.messages.forEach((message) => dispatch(messageAdd(message)));
            dispatch(setCurrentChannel(data.currentChannelId));
            dispatch(setDefaultChannelId(data.currentChannelId));
        };
        fetchContent();
    }, [dispatch, auth.currUser.token]);

    return (
        <div>
            <Container className="h-100 my-4 overflow-hidden rounded shadow">
                <Row className="h-100 bg-white flex-md-row">
                    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
                        <ChannelList/>
                    </Col>
                    <Col className="col p-0 h-100">
                        <MessageList/>
                    </Col>
                </Row>
            </Container>
            <ModalService/>
        </div>
    );
};

export default Chat;