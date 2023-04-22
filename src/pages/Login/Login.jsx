import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../helpers/useForm";
import { useNavigate } from "react-router-dom";
import { alertActions } from "../../redux/action/alertAction";
import { newsAction } from "../../redux/action/newsAction";
import "./Login.scss";
const isNotEmpty = (value) => value?.trim() !== "";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useSelector((el) => el?.alert);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    e.preventDefault();
    let payload = {
      username: username.trim(),
      password: password.trim(),
    };

    if (!passwordIsValid || !usernameIsValid) {
      dispatch(alertActions.error("Fill in all required fields"));
      setLoading(false);
      return;
    }
    dispatch(newsAction.login(payload));
  };
  useEffect(() => {
    if (alert.type === "alert-success") {
      navigate("/create-news");
    }
    document.title = "Login";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, loading]);

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
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
