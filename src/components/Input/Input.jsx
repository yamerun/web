import style from "./Input.module.scss";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLogin } from "../../store/userAccountSlice/AccountSlice";
import { setPassword } from "../../store/userAccountSlice/AccountSlice";
export const Input = () => {
  const [loginValid, setLoginValid] = useState(false);
  const [logErr, setLogErr] = useState("");
  const [PassValid, setPassValid] = useState(false);
  const [passErr, setPassErr] = useState("");
  const dispatch = useDispatch();
  const { login, password } = useSelector((state) => ({
    login: state.AccountSlice.login,
    password: state.AccountSlice.password,
  }));

  const InputLoginField = (e) => {
    const value = e.target.value;
    const newValue = value.replace(/^[\s.`":'$@~;]*|[\s.`":'$@~;]*$/g, "");
    if (newValue != value) e.target.value = newValue;
    if (!newValue) {
      setLoginValid(false);
      setLogErr("Поле Логин не может быть пустым");
    }
    if (newValue.length < 3) {
      setLoginValid(false);
      setLogErr("Поле Логин не может быть короче 3х символов");
    } else {
      setLoginValid(true);
      setLogErr("");
      dispatch(setPassword(newValue));
    }
  };

  const InputPassField = (e) => {
    const value = e.target.value;
    const newValue = value.replace(/^[\s.`":'$@~;]*|[\s.`":'$@~;]*$/g, "");
    if (newValue != value) e.target.value = newValue;
    if (!newValue) {
      setPassValid(false);
      setPassErr("Поле Пароль не может быть пустым");
    }
    if (newValue.length < 6) {
      setPassValid(false);
      setPassErr("Поле Пароль не может быть короче 6х символов");
    } else {
      setPassValid(true);
      setPassErr("");
      dispatch(setPassword(newValue));
    }
  };

  console.log(loginValid);
  console.log(PassValid);

  return (
    <div className={style.Inputs}>
      <div className={style.Inputs__fieldsBox}>
        <h1 className={style.Inputs__fieldsBox__header}>Логин</h1>
        <input
          className={style.Inputs__fieldsBox__input}
          onChange={(e) => InputLoginField(e)}
        />
        <span>{logErr}</span>
      </div>

      <div className={style.Inputs__fieldsBox}>
        <h1 className={style.Inputs__fieldsBox__header}>Пароль</h1>
        <input
          className={style.Inputs__fieldsBox__input}
          onChange={(e) => InputPassField(e)}
        />
        <span>{passErr}</span>
      </div>
    </div>
  );
};
