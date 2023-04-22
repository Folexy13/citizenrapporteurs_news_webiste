import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { routes } from "../routes";
import { alertActions } from "../redux/action/alertAction";

const ProtectedPages = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  let isAuth = false;
  let isLoggedin = JSON.parse(localStorage.getItem("isLoggedIn"));
  try {
    const time = JSON.parse(atob(token?.split(".")[1]))?.exp;
    const tokenIsExpired = time * 1000 < new Date();
    tokenIsExpired
      ? localStorage.setItem("isLoggedIn", false)
      : localStorage.setItem("isLoggedIn", true);
    isAuth = !tokenIsExpired || isLoggedin;
  } catch {}
  if (!isAuth) {
    dispatch(alertActions.error("You must login first"));
  }
  return isAuth ? <Outlet /> : <Navigate to={routes.LOGIN.path} />;
  // console.log(user);
};

export default ProtectedPages;
