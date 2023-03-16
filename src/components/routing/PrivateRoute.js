import React, { useContext } from "react";
import Link, { Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../../store/auth.js';

const PrivateRoute = ({ children }) => {

    const { isAuthenticated } = useContext(AuthContext);

    return (<>
        {isAuthenticated ? children : <Redirect from="*" to="/auth/login" />}
    </>);
};

export default PrivateRoute;