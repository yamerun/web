import React from "react";
import axios from "axios";
import style from "./LoginPage.module.scss";
import { Input } from "../../components/Input/Input";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className={style.LoginPage}>
      <div className={style.LoginPage__form}>
        <h1 className={style.LoginPage__header}>Авторизация</h1>
        <Input />
        <button className={style.LoginPage__btn}>Войти →</button>
        <div className={style.LoginPage__goToRegister}>
          <Link className={style.LoginPage__goToRegister__link} to='/register'>Зарегистрироваться</Link>
          <h1 className={style.LoginPage__goToRegister__header}>Если вы новый пользователь</h1>
        </div>
      </div>
    </div>
  );
};
