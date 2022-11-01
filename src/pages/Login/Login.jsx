import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../helpers/useForm";
import { useNavigate } from "react-router-dom";
import { alertActions } from "../../redux/action/alertAction";
import { newsAction } from "../../redux/action/newsAction";
import "./Login.scss";
import { routes } from "../../routes";
const isNotEmpty = (value) => value?.trim() !== "";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useSelector((el) => el?.alert);
  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangedHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useForm(isNotEmpty);
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangedHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useForm(isNotEmpty);
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      username: username.trim(),
      password: password.trim(),
    };
    console.log(username);

    if (!passwordIsValid || !usernameIsValid) {
      dispatch(alertActions.error("Fill in all required fields"));
      return;
    }
    dispatch(newsAction.login(payload));
  };
  useEffect(() => {
    if (alert.type === "alert-success") {
      navigate("/create-news");
    }
  }, [alert, navigate]);

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="useraname">Username</label>
          <input
            type="text"
            value={username}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            placeholder="Enter username"
          />
          {usernameHasError && (
            <p className="error-text">Username cannot be empty</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="useraname">Password</label>
          <input
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            placeholder="Enter Password"
          />
          {passwordHasError && (
            <p className="error-text">Password cannot be empty</p>
          )}
        </div>
        <div className="form-control">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
