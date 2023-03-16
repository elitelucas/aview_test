/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext } from "react";
// react library for routing
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";
import { AuthContext } from '../store/auth';
import PrivateRoute from 'components/routing/PrivateRoute.js';
import Login from "views/pages/examples/Login.js";

function Auth() {
  const location = useLocation();
  const mainContentRef = React.useRef(null);
  const { isAuthenticated } = useContext(AuthContext);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
    document.body.classList.add("bg-default");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      // if (prop.layout === "/auth" && isAuthenticated()) {
      if (prop.layout === "/auth") {

        return (
          // <PrivateRoute>
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
          // </PrivateRoute>
        );
      } else {
        // return <Route path="/auth/login" component={Login} />;
        return null;
      }
      // if (isAuthenticated()) {
      //   <Route path="/auth/login" component={Login} />
      // }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContentRef}>
        {/* <AuthNavbar /> */}
        <Switch>
          {/* {!isAuthenticated() ? <Route path="/auth/login" component={Login} /> : getRoutes(routes)} */}
          <Route path="/auth/login" component={Login} />
          <PrivateRoute>
          {getRoutes(routes)}
          </PrivateRoute>
          {/* { isAuthenticated()? <Redirect from="*" to="/auth/welcome" /> : <Redirect from="*" to="/auth/login" /> } */}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </div>
      {/* <AuthFooter /> */}
    </>
  );
}

export default Auth;
