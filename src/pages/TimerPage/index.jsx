import React,{useState,useEffect} from "react";
import "./assets/style.css";
import img1 from "./assets/img/changePro.png";
import img2 from "./assets/img/icon.gif";
import axios from "axios";
export const TimerPage = () => {

  const [login,setLogin] = useState('');
  const [pass,setPass] = useState('')
  function countdown() {
    const deadline = new Date("may 25, 2023 00:00:00").getTime();

    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").innerHTML = days;
      document.getElementById("hours").innerHTML = hours;
      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;

      if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = 0;
        document.getElementById("hours").innerHTML = 0;
        document.getElementById("minutes").innerHTML = 0;
        document.getElementById("seconds").innerHTML = 0;
      }
    }, 1000);
  }

  countdown();

  console.log("woo");

  const changePassword = ({value}) => {
    setPass(value)
  }
  const changeLogin = ({value}) => {
    setLogin(value)
  }

  axios.post(`https://change.pro/api/auth/login`,{
    email: login,
    password: pass
  })

  return (
    <div className="countdown-timer">
      <div class="countdown-timer__popup">
        <form class="countdown-timer__popup__form">
          <label for="email">Логин:</label>
          <input
            type="text"
            id="login"
            name="email"
            onChange={(e)=>changeLogin(e.target)}
            required
            className="countdown-timer__popup__form__input"
          />
          <label for="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e)=>changePassword(e.target)}
            required
            className="countdown-timer__popup__form__input"
          />
          <button type="submit">Отправить</button>
        </form>
      </div>

      <img src={img1} className="countdown-timer--logo" />
      <h1 className="countdown-timer--tittle">
        ОБМЕН КРИПТЫ УЖЕ НЕ БУДЕТ ПРЕЖНИМ.
      </h1>
      <div className="countdown-timer--stroke">
        <div className="countdown-timer__item">
          <div className="countdown-timer__value" id="days">
            0{" "}
          </div>
          <div className="countdown-timer__label"> Дней</div>
        </div>
        <div className="countdown-timer__item">
          <div className="countdown-timer__value" id="hours">
            0
          </div>
          <div className="countdown-timer__label"> Часов</div>
        </div>
        <div className="countdown-timer__item">
          <div className="countdown-timer__value" id="minutes">
            0{" "}
          </div>
          <div className="countdown-timer__label"> Минут</div>
        </div>
        <div className="countdown-timer__item">
          <div className="countdown-timer__value" id="seconds">
            0{" "}
          </div>
          <div className="countdown-timer__label"> Секунд</div>
        </div>
      </div>
      <img src={img2} className="countdown-timer--gif" />
    </div>
  );
};
