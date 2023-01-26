import './App.css';
import {BrowserRouter, Route, Routes, useLocation, Navigate} from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Error404 from "./Error404";
import Chat from "./Chat";

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const token = localStorage.getItem('jwt');

    return (
        token ? children : <Navigate to="/login" state={{from: location}}/>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Layout/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={(
                        <PrivateRoute>
                            <Chat/>
                        </PrivateRoute>
                    )}/>
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
