import React, { useState, useRef, useEffect } from "react";
import style from "./Register.module.scss";
import { InputRegistration } from "../../components/inputRegistration/inputRegistration";
import { Link } from "react-router-dom";
import img from "../../assets/imgs/VKCircled.svg";
import img2 from "../../assets/imgs/GmailLogo.svg";
import img3 from "../../assets/imgs/Twitter.svg";
import img4 from "../../assets/imgs/Odnoklassniki.svg";
import img5 from "../../assets/imgs/Atsign.svg";
import { Footer } from "../../components/Footer/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/changePro.png";
export const RegisterPage = () => {
  const { password, verifiedPassword, email, name } = useSelector((state) => ({
    password: state.AccountSlice.password,
    verifiedPassword: state.AccountSlice.verifiedPassword,
    email: state.AccountSlice.email,
    name: state.AccountSlice.name,
  }));

  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const ref = useRef(null);
  const Register = () => {
    axios
      .post(`http://146.59.87.222/api/auth/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: verifiedPassword,
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
    <div className={style.RegisterPage}>
      <img alt="logo" src={logo} className={style.RegisterPage__logo} />
      <div className={style.RegisterPage__form}>
        <h1 className={style.RegisterPage__header}>Регистрация</h1>
        <div>
          <h1 className={style.RegisterPage__header2}>Регистрация в 1 клик</h1>
          <div className={style.RegisterPage__registerVariants}>
            <img src={img} alt="vk" />
           
            
            <img src={img2} alt="gmail" />
            <img src={img3} alt="twitter" />
            <img src={img4} alt="ok" />
            <img src={img5} alt="At" />
          </div>
          <div className={style.RegisterPage__reg}>
            <h1 className={style.RegisterPage__header2}>
              Регистрация через E-mail
            </h1>
            <InputRegistration />
            <button className={style.RegisterPage__btn} onClick={Register}>
              Зарегистрироваться →
            </button>
            <p className={style.RegisterPage__text}>
              Нажав «Зарегистрироваться», я принимаю условия Пользовательского
              соглашения и Политики конфиденциальности
            </p>
            <span style={{ color: "white" }}>{err}</span>
          </div>
          <div className={style.RegisterPage__goToLogin}>
            <Link to="/login" className={style.RegisterPage__goToLogin__link}>
              Я уже зарегистрирован
            </Link>
            <p className={style.RegisterPage__goToLogin__text}>
              Войдите, если у вас есть аккаунт
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
