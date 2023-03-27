import React, { useState } from "react";
import axios from "axios";
import style from "./LoginPage.module.scss";
import { useSelector } from "react-redux";
import { Input } from "../../components/InputLogin/Input";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const { email, password } = useSelector((state) => ({
    email: state.AccountSlice.emailLogin,
    password: state.AccountSlice.passwordLogin,
  }));

  const Login = () => {
    axios
      .post(`http://146.59.87.222/api/auth/login`, {
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

  return (
    <div className={style.LoginPage}>
      <div className={style.LoginPage__form}>
        <h1 className={style.LoginPage__header}>Авторизация</h1>
        <Input />
        <button className={style.LoginPage__btn} onClick={Login}>
          Войти →
        </button>
        <div className={style.LoginPage__goToRegister}>
          <Link className={style.LoginPage__goToRegister__link} to="/register">
            Зарегистрироваться
          </Link>
          <h1 className={style.LoginPage__goToRegister__header}>
            Если вы новый пользователь
          </h1>
        </div>
      </div>
      <div className={style.LoginPage__footer}>
        <Footer />
      </div>
    </div>
  );
};
