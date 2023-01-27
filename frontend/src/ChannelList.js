import {useSelector} from "react-redux";
import Nav from 'react-bootstrap/Nav';

const ChannelList = () => {
    const channels = useSelector(state => state.channel);

    const navItems = Object.entries(channels).map(([k, v]) => (
        <Nav.Item key={k}>
            <Nav.Link className="w-100 rounded-0 text-start btn-secondary">
                <span className="me-1">#</span>
                {v.name}
            </Nav.Link>
        </Nav.Item>
    ))

    return (
        <div>
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>Каналы</span>
            </div>
            <Nav className="flex-column nav-pills nav-fill px-2">
                {navItems}
            </Nav>
        </div>
    )
}

export default ChannelList;