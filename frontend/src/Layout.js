import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
                <Container>
                    <Navbar.Brand>Hexlet Chat</Navbar.Brand>
                </Container>
            </Navbar>

            <Outlet/>
        </div>
    );
}

export default Layout;