import style from "./Input.module.scss";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoginEmail, setLoginPassword } from "../../store/userAccountSlice/AccountSlice";

export const Input = () => {
  const dispatch = useDispatch();

  const {email,password} = useSelector((state)=>({
    email: state.AccountSlice.emailLogin,
    password: state.AccountSlice.passwordLogin,
  }))
  const InputLoginField = (e) => {
    dispatch(setLoginEmail(e.target.value));
  };

  const InputPassField = (e) => {
    dispatch(setLoginPassword(e.target.value));
  };



  return (
    <div className={style.Inputs}>
      <div className={style.Inputs__fieldsBox}>
        <h1 className={style.Inputs__fieldsBox__header}>Логин</h1>
        <input
          className={style.Inputs__fieldsBox__input}
          onChange={(e) => InputLoginField(e)}
        />
      </div>
      <div className={style.Inputs__fieldsBox}>
        <h1 className={style.Inputs__fieldsBox__header}>Пароль</h1>
        <input
          className={style.Inputs__fieldsBox__input}
          onChange={(e) => InputPassField(e)}
        />
      </div>
    </div>
  );
};
