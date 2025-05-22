import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { Context } from "./store/context";
import { Animals } from "./pages/animals";
import { Login } from "./pages/login";
import { NavigationMenu } from "./compenents/navigation";
import { Rewievs } from "./pages/rewievs";
import { News } from "./pages/news";
import { Vactination } from "./pages/vactination";

function App() {
  const { store } = useContext(Context);
  const [isAuth, setAuth] = useState(store.isAuth);

  useEffect(() => {
    store.checkAuth();
  }, []);

  useEffect(() => {
    setAuth(store.isAuth);
  }, [store.isAuth]);

  return (
    <div className="flex flex-col min-h-screen ">
      <Router>
        <div>
          <div>{!isAuth ? <></> : <NavigationMenu />}</div>
          <div style={!isAuth ? {} : { marginLeft: "250px" }}>
            <Routes>
              {!isAuth ? (
                <>
                  <Route path={"*"} element={<Login />}></Route>
                </>
              ) : (
                <>
                  <Route path={"/animals/*"} element={<Animals />}></Route>
                  <Route path={"/rewievs/*"} element={<Rewievs />}></Route>
                  <Route path={"/news/*"} element={<News />}></Route>
                  <Route
                    path={"/vactination/*"}
                    element={<Vactination />}
                  ></Route>
                  <Route path={"*"} element={<Animals />}></Route>
                </>
              )}
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default observer(App);
