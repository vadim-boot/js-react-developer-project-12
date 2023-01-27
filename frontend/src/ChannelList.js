import {useSelector} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ChannelList = () => {
    const channels = useSelector(state => state.channel);
    console.log(`channels = ${channels}`);

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col className="col-12 col-sm-auto">
                    <p align="center">{JSON.stringify(channels)}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ChannelList;