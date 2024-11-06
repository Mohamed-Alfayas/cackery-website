// import { Route, Routes } from "react-router-dom";
// import AppLayout from "./layout/AppLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Index from "./routes";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import { ToastAlert } from "./component/common/ToastAlert";

function App() {

  const { isPreloaderShow } = useContext(DataContext)

  return (
    <main className="app_container">
      <ToastAlert />
      <Index />
      {isPreloaderShow && (
        <div className="preloader-container">
          <img src={require("./assets/loader/loader-1.gif")} />
        </div>
      )}
    </main>
  );
}

export default App;
