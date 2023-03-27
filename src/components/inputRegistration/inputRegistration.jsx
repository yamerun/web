import React, { useState } from "react";
import style from "./inputRegistration.module.scss";
import { useDispatch } from "react-redux";
import { setverifiedPassword } from "../../store/userAccountSlice/AccountSlice";
import { setEmail } from "../../store/userAccountSlice/AccountSlice";
import { setPassword } from "../../store/userAccountSlice/AccountSlice";
import { setName } from "../../store/userAccountSlice/AccountSlice";

export const InputRegistration = (e) => {
  const dispatch = useDispatch();

  const ChangeVerifyPassstValue = (e) => {
    dispatch(setverifiedPassword(e.target.value));
  };

  const changePassValue = (e) => {
    const newValue = e.target.value.replace(
      /^[\s.`":'$@~;]*|[\s.`":'$@~;]*$/g,
      ""
    );
    if (newValue != e.target.value) e.target.value = newValue;
    dispatch(setPassword(newValue));
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const changeEmailValue = (e) => {
    if (emailIsValid(e.target.value) === true) {
      dispatch(setEmail(e.target.value));
    }
  };

  const changeNameValue = (e) => {
    const newValue = e.target.value.replace(
      /^[\s.`":'$@~;]*|[\s.`":'$@~;]*$/g,
      ""
    );
    if (newValue != e.target.value) e.target.value = newValue;
    dispatch(setName(newValue));
  };

  return (
    <div className={style.inputsReg}>
      <h1 className={style.inputsReg__header}>Имя</h1>
      <input onChange={(e) => changeNameValue(e)} className={style.inputsReg__fields}/>
      <h1 className={style.inputsReg__header}>E-mail</h1>
      <input onChange={(e) => changeEmailValue(e)} className={style.inputsReg__fields}/>
      <h1 className={style.inputsReg__header}>Пароль</h1>
      <input onChange={(e) => changePassValue(e)} className={style.inputsReg__fields}/>
      <h1 className={style.inputsReg__header}>Подтвердите Пароль</h1>
      <input onChange={(e) => ChangeVerifyPassstValue(e)} className={style.inputsReg__fields}/>
    </div>
  );
};
