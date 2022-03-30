import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Home/Dashboard";
import Home from "../Components/Home/Home";
import Login from "../Components/Auth/Login";
import Logout from "../Components/Auth/Logout";
import CreateBooking from "../Components/CreateBooking/Index";
import RoomDetails from "../Components/RoomDetails/Index";
import BookingList from "../Components/BookingList/Index";
import UpdateBooking from "../Components/UpdateBooking/Index";
import Autograph from "../Components/Autograph/Index";
import HeadOffice from "../Components/HeadOffice/Index";
import CorporateOffice from "../Components/CorporateOffice/Index";

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
      {isLoggedIn ? <Redirect to="/home" /> : <Login />}
    </Route>
    <RequireAuth>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/head-office" component={HeadOffice} />
      <Route path="/corporate-office" component={CorporateOffice} />
      <Route path="/strategic-office" component={Autograph} />
      {/* <Route path="/room-details" component={RoomDetails} /> */}
      {/* <Route path="/room-details/:id" component={RoomDetails} /> */}
      <Route path="/room-details/:id/:date" component={RoomDetails} />
      <Route path="/create-booking" component={CreateBooking} />
      <Route path="/booking-list" component={BookingList} />
      <Route path="/update-booking/:id" component={UpdateBooking} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </RequireAuth>
  </Switch>
);
export default AppLayout;
