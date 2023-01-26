import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Chat = () => {
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col className="col-12 col-sm-auto">
                    <h1 align="center">Super chat!</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;