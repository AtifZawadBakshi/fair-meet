import { BrowserRouter, Route, useHistory } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Header from "./Layout/Partials/Header";
import Sidebar from "./Layout/Partials/Sidebar";

function App() {
  return (
    <BrowserRouter>
      {/* <AppLayout /> */}
      <div className="main">
        <Header />
        <main className="content">
          <AppLayout />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
