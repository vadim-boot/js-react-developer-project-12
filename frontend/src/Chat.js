import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {channelAdd} from "./slices/channelSlice";
import ChannelList from "./ChannelList";
import MessageList from "./MessageList";

const getAuthHeader = () => {
    const token = localStorage.getItem('jwt');

    if (token) {
        return {Authorization: `Bearer ${token}`};
    }

    return {};
};

const Chat = () => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    useEffect(() => {
        const fetchContent = async () => {
            const {data} = await axios.get('/api/v1/data', {headers: getAuthHeader()});
            setContent(data);
            data.channels.forEach((channel) => {
                dispatch(channelAdd(channel));
            })
        };
        fetchContent();
    }, [dispatch]);

    return (
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
    );
};

export default Chat;