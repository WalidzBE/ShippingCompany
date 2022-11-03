import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import AddShipment from "./components/screens/AddShipment";
import Home from "./components/screens/Home";
import Shipment from "./components/screens/EditShipment";
import Shipments from "./components/screens/Shipments";
import LogIn from "./components/screens/LogIn";
import SignUp from "./components/screens/SignUp";
import NotFound from "./components/screens/NotFound";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/templates/Header";
import { auth } from "./actions/account";
import Loader from "./components/atoms/Loader";
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function RequireAuth({ children }) {
  const account = useSelector((state) => state.account);
  const location = useLocation();
  var isAuth = Object.keys(account).length > 0;
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(auth())
      .then((user) => {
        console.log(user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route
            exact
            path="/addShipment"
            element={
              <RequireAuth>
                <AddShipment />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/shipments"
            element={
              <RequireAuth>
                <Shipments />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/shipments/:waybill"
            element={
              <RequireAuth>
                <Shipment />
              </RequireAuth>
            }
          />
        </Route>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
