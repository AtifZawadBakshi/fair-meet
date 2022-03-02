import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Components/Home/Dashboard";

const AppLayout = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);
export default AppLayout;
