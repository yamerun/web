import React, { useState, useEffect } from "react";
import "./assets/style.css";
import img1 from "./assets/img/changePro.png";
import img2 from "./assets/img/icon.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const TimerPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = new Date("may 25, 2023 00:00:00").getTime();

  useEffect(() => {
      const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline - now;
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

      if (distance < 0) {
        clearInterval(interval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const changePassword = ({ value }) => {
    setPass(value);
  };
  const changeLogin = ({ value }) => {
    setLogin(value);
  };

  const Register = () => {
    axios
      .post(`https://change.pro/api/auth/login`, {
        email: login,
        password: pass,
      })
      .then(function (response) {
        navigate("/changePro");
        localStorage.setItem("siteJwt", response.data.token);
      })
      .catch(function (error) {
        window.location.href = "/";
      });
  };

  const configForSiteAuth = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("siteJwt")}`,
    },
  };

  React.useEffect(() => {
    axios
      .post("https://change.pro/api/auth/check", {}, configForSiteAuth)
      .then(function (response) {
        console.log(response.data.data.is_auth);
        if (response.data.data.is_auth === true) {
          navigate("/changePro");
        }
      })
      .catch(function (error) {});
  }, []);

  return (
    <div className="countdown-timer">
      <div className="countdown-timer__popup">
        <label for="email">Логин:</label>
        <input
          type="text"
          id="login"
          name="email"
          onChange={(e) => changeLogin(e.target)}
          required
          className="countdown-timer__popup__form__input"
        />
        <label for="password">Пароль:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => changePassword(e.target)}
          required
          className="countdown-timer__popup__form__input"
        />
        <button onClick={Register}  className="countdown-timer__popup__form__btn">Отправить</button>
      </div>

      <img src={img1} className="countdown-timer--logo" />
      <h1 className="countdown-timer--tittle">
        ОБМЕН КРИПТЫ УЖЕ НЕ БУДЕТ ПРЕЖНИМ.
      </h1>
      <div className="countdown-timer--stroke">
        <div className="countdown-timer__item">
          <div className="countdown-timer__value" id="days">
            {days}
          </div>
          <div className="countdown-timer__label"> Дней</div>
        </div>
        <div className="countdown-timer__item">
          <div className="countdown-timer__value" id="hours">
            {hours}
          </div>
          <div className="countdown-timer__label"> Часов</div>
        </div>
        <div className="countdown-timer__item">
          <div className="countdown-timer__value" id="minutes">
          {minutes}
          </div>
          <div className="countdown-timer__label">Минут</div>
        </div>
        <div className="countdown-timer__item">
          <div className="countdown-timer__value" id="seconds">
            {seconds}
          </div>
          <div className="countdown-timer__label"> Секунд</div>
        </div>
      </div>
      <img src={img2} className="countdown-timer--gif" />
    </div>
  );
};
