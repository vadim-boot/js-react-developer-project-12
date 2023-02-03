import './App.css';
import {BrowserRouter, Route, Routes, useLocation, Navigate, useNavigate} from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Error404 from "./Error404";
import Chat from "./Chat";
import {ApiProvider} from "./ChatAPI";
import Signup from "./Signup";
import AuthContext from "./contexts/AuthContext";
import {useContext, useState} from "react";

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const auth = useContext(AuthContext);

    return (
        auth.currUser.username !== null ? children : <Navigate to="/login" state={{from: location}}/>
    );
};

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [currUser, setCurrUser] = useState({username: null, token: ''});
    const logIn = ({username, token}) => {
        setCurrUser({username, token});
    }
    const logOut = () => {
        setCurrUser({username: null, token: ''});
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{currUser, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ApiProvider>
                    <div>
                        <Layout/>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/" element={(
                                <PrivateRoute>
                                    <Chat/>
                                </PrivateRoute>
                            )}/>
                            <Route path="*" element={<Error404/>}/>
                        </Routes>
                    </div>
                </ApiProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
