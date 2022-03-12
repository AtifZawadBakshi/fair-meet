import { BrowserRouter, Route, useHistory } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Header from "./Layout/Partials/Header";
import Preloader from "./Layout/Partials/PreLoader";
import Sidebar from "./Layout/Partials/Sidebar";
import PageHeader from "./Layout/Partials/PageHeader";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const history = useHistory();
  if (user != null) {
    return (
      <BrowserRouter history={history}>
        <Preloader />
        <div id="pcoded" className="pcoded">
          <div className="pcoded-overlay-box" />
          <div className="pcoded-container navbar-wrapper">
            <Header userDetails={user.user} />
            <div className="pcoded-main-container">
              <div className="pcoded-wrapper">
                <Sidebar userDetails={user.user} />
                <div className="pcoded-content">
                  <AppLayout />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    );
  }
}

export default App;
