import React from "react";
import style from "./ExchangerRegForm.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ExchanngerRegisterForm() {
  const [login, setLogin] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmpass, setConfirmpass] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [num, setNum] = React.useState("");
  const [telegram, setTelegram] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [fileUrl, setFileUrln] = React.useState("");
  const [message,setMessage] = React.useState('');
  const navigate = useNavigate()

  const changeValue = ({ name, value }) => {
    switch (name) {
      case "login":
        setLogin(value);
        break;
      case "password":
        setPass(value);
        break;
      case "passwordConfirm":
        setConfirmpass(value);
        break;
      case "e-mail":
        setEmail(value);
        break;
      case "phoneNum":
        setNum(value);
        break;
      case "telegram":
        setTelegram(value);
        break;
      case "exchangerLink":
        setUrl(value);
        break;
      case "fileLink":
        setFileUrln(value);
        break;
    }
  };

  const RegisterExchanger = () => {
    axios.post(`https://change.pro/api/auth/register_exchanger`, {
      name: login,
      email: email,
      password: pass,
      password_confirmation: confirmpass,
      phone: num,
      telegram: telegram,
      xml_url: fileUrl,
      site_url: url,
    }).then(function(response){
       setMessage(response.data.message);
       localStorage.setItem('jwt',response.data.token)
       navigate('/InfoPage')
    }).catch(function(error){
        setMessage(error.response.data.message)
    });
  };

  return (
    <div className={style.Form}>
      <div className={style.Form__container}>
        <div className={style.Form__container__inputBox}>
          <label for="login">Логин</label>
          <input
            required
            name="login"
            id="login"
            onChange={(e) => changeValue(e.target)}
          />
        </div>
        <div className={style.Form__container__inputBox}>
          <label for="password">Пароль</label>
          <input
            required
            name="password"
            id="password"
            onChange={(e) => changeValue(e.target)}
          />
        </div>
        <div className={style.Form__container__inputBox}>
          <label for="passwordConfirm">Подтверждение пароля</label>
          <input
            required
            name="passwordConfirm"
            id="password"
            onChange={(e) => changeValue(e.target)}
          />
        </div>
        <div className={style.Form__container__inputBox}>
          <label for="email">Почта</label>
          <input
            required
            name="e-mail"
            id="e-mail"
            onChange={(e) => changeValue(e.target)}
          />
        </div>
        <div className={style.Form__container__inputBox}>
          <label for="phoneNum">Номер телефона:</label>
          <input
            required
            name="phoneNum"
            id="phoneNum"
            onChange={(e) => changeValue(e.target)}
          />
        </div>
        <div className={style.Form__container__inputBox}>
          <label for="telegram">Телеграмм</label>
          <input
            required
            name="telegram"
            id="telegram"
            onChange={(e) => changeValue(e.target)}
          />
        </div>
        <div className={style.Form__container__inputBox}>
          <label for="exchangerLink">Ссылка на сайт обменника</label>
          <input
            required
            name="exchangerLink"
            id="echangerLink"
            onChange={(e) => changeValue(e.target)}
          />
        </div>
        <div className={style.Form__container__inputBox}>
          <label for="fileLink">Ссылка на файл с курсами</label>
          <input
            required
            name="fileLink"
            id="fileLink"
            onChange={(e) => changeValue(e.target)}
          />
        </div>
        <span className={style.message}>{message}</span>
        <div className={style.Form__container__footer}>
          <button
            className={style.Form__container__register}
            onClick={RegisterExchanger}
          >
            Регистрация
          </button>
          <Link to="/register" className={style.Form__container__link}>
            Зарегистрироватсья как пользователь
          </Link>
        </div>
      </div>
    </div>
  );
}
