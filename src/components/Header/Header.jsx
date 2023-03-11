import React from "react";
import style from "./Header.module.scss";
import logo from '../../assets/imgs/logo.svg'
export const Header = () => {
  const menuBtns = [
    "Монторинг",
    "Обменники",
    "Партнерам",
    "Помощь",
    "Контакты",
  ];


  return (
    <header className={style.Header}>
      <div className={style.Header__container}>
        <div className={style.Header__container__menu}>
          <img className={style.Header__container__logo} src={logo} alt="logo" />
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
            />
            <button className={style.Header__container__search__searchBtn} />
          </div>
          <button className={style.Header__container__logInBtn}>Войти</button>
          </div>
        </div>
      </div>
    </header>
  );
};
