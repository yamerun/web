import React from "react";
import style from "./Header.module.scss";
import logo from "../../assets/imgs/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Header = () => {
  const menuBtns = ["Мониторинг", "Обменники", "Партнерам", "Помощь", "Статьи"];
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/");
  };

  const goToAccount = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    axios
      .get(`http://146.59.87.222/api/user/get`, config)
      .then(function (response) {
        navigate("/account");
      })
      .catch(function (error) {
        if (error) {
          navigate("/login");
        }
      });
  };
  return (
    <header className={style.Header}>
      <div className={style.Header__container}>
        <div className={style.Header__container__menu}>
          <img
            className={style.Header__container__logo}
            src={logo}
            alt="logo"
            onClick={() => goToMain()}
          />
          <nav>
            <ul className={style.Header__container__buttons}>
              {menuBtns.map((item) => (
                <li className={style.Header__container__btn}>{item}</li>
              ))}
            </ul>
          </nav>
          <div className={style.Header__container__rightSide}>
            <div className={style.Header__container__search}>
              <input
                className={style.Header__container__search__input}
                placeholder="Поиск"
                disabled
              />
              <button className={style.Header__container__search__searchBtn} />
            </div>
            <button
              className={style.Header__container__logInBtn}
              onClick={goToAccount}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
