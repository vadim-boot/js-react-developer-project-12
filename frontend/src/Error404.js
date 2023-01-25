import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Error404 = () => {
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col className="col-12 col-sm-auto">
                    <h1 align="center">Error 404</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Error404;