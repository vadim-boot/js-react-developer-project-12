import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {channelAdd} from "./slices/channelSlice";
import ChannelList from "./ChannelList";

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
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col className="col-12 col-sm-auto">
                    <p align="center">{JSON.stringify(content)}</p>
                    <ChannelList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;