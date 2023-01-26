import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from "react";
import axios from "axios";

const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('jwt'));

    if (token) {
        return { Authorization: `Bearer ${token}` };
    }

    return {};
};

const Chat = () => {

    const [content, setContent] = useState('');
    const fetchContent = async () => {
        const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
        setContent(data);
    };
    useEffect(() => {

        fetchContent();
    }, []);

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col className="col-12 col-sm-auto">
                    <p align="center">{JSON.stringify(content)}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;