import { Route, Routes } from "react-router-dom";
import { Registration } from "../components/auth/registration";
import { Authorization } from "../components/auth/authorization";
import ResetPassword from "../components/auth/forgotPassword";

export const Auth = () => {
  return (
    <>
      <Routes>
        <Route path={"registration"} element={<Registration />}></Route>
        <Route path={"login"} element={<Authorization />}></Route>
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path={"/"} element={<Authorization />}></Route>
      </Routes>
    </>
  );
};
