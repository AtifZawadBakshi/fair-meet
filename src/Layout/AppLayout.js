import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Home/Dashboard";
import Login from "../Components/Auth/Login";
import Logout from "../Components/Auth/Logout";
import Autograph from "../Components/Autograph/Index";
import CorporateOffice from "../Components/CorporateOffice/Index";
import HeadOffice from "../Components/HeadOffice/Index";

var user = JSON.parse(localStorage.getItem("user"));
let isLoggedIn = false;
if (user != null) {
  isLoggedIn = true;
} else {
  isLoggedIn = false;
}
// const isLoggedIn = true;
const RequireAuth = ({ children }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return children;
};
const AppLayout = () => (
  <Switch>
    <Route path="/login">
      {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
    </Route>
    <RequireAuth>
      <Redirect to="/dashboard" />
      <Route exact path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/corporate-office" component={CorporateOffice} />
      <Route path="/head-office" component={HeadOffice} />
      <Route path="/autograph" component={Autograph} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </RequireAuth>
  </Switch>
);
export default AppLayout;
