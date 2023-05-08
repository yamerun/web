import React, { useState } from "react";
import axios from "axios";
import style from "./LoginPage.module.scss";
import { useSelector } from "react-redux";
import { Input } from "../../components/InputLogin/Input";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/changePro.png";
export const LoginPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const { email, password } = useSelector((state) => ({
    email: state.AccountSlice.emailLogin,
    password: state.AccountSlice.passwordLogin,
  }));

  const Login = () => {
    axios
      .post(`https://change.pro/api/auth/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("jwt", response.data.token);
        navigate("/account");
      })
      .catch(function (error) {
        setErr(error.response.data.message);
      });
  };

  const goMain = () => {
    navigate("/");
  };

  return (
    <div className={style.LoginPage}>
      <div className={style.LoginPage__formBox}>
        <img
          alt="logo"
          src={logo}
          className={style.LoginPage__logo}
          onClick={goMain}
        />
        <div className={style.LoginPage__form}>
          <h1 className={style.LoginPage__header}>Авторизация</h1>
          <Input />
          <button className={style.LoginPage__btn} onClick={Login}>
            Войти →
          </button>
          <span style={{ color: "white" }}>{err}</span>
          <div className={style.LoginPage__goToRegister}>
            <Link
              className={style.LoginPage__goToRegister__link}
              to="/register"
            >
              Зарегистрироваться
            </Link>
            <h1 className={style.LoginPage__goToRegister__header}>
              Если вы новый пользователь
            </h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
