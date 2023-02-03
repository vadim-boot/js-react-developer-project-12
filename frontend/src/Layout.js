import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import {Outlet, Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "./contexts/AuthContext";

const Layout = () => {
    const auth = useContext(AuthContext);
    return (
        <div>
            <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
                <Container>
                    <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        {auth.currUser.username !== null
                            ? <Button variant="primary" onClick={() => auth.logOut()}>Выйти</Button>
                            : ''
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet/>
        </div>
    );
}

export default Layout;