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
  console.log('Auth.js')

  return (
    <>
      <div className="main-content" ref={mainContentRef}>
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </div>
    </>
  );
}

export default Auth;
