import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Home/Dashboard";
import Login from "../Components/Auth/Login";
import Logout from "../Components/Auth/Logout";
import CreateBooking from "../Components/CreateBooking/Index";
// import UpdateBooking from "../Components/UpdateBooking/Index";
import EditBooking from "../Components/EditBooking/Index";

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
      <Route exact path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create-booking" component={CreateBooking} />
      {/* <Route path="/update-booking" component={UpdateBooking} /> */}
      <Route path="/edit-booking" component={EditBooking} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </RequireAuth>
  </Switch>
);
export default AppLayout;
