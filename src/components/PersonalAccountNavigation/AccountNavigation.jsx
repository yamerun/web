import React from "react";
import { Link } from "react-router-dom";
import style from "./PersonalAccountNavigation.module.scss";
import { useNavigate } from "react-router-dom";
export default function AccountNavigation({ item }) {
  const navigate = useNavigate();
  const handleSelect = (e) => {
    const btnElements = document.querySelectorAll(
      `.${style.PersonalAccount__container__leftBar__navigation__list__item}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
  };

  const LogOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userRole");
    navigate("/");
  };
  return (
    <nav className={style.Navigation}>
      <h1 className={style.Navigation__userName}>{item.data.name}</h1>
      <ul className={style.Navigation__list}>
        <li
          className={style.Navigation__list__item}
          onClick={(e) => handleSelect(e)}
        >
          Мой кабинет
        </li>
        <li
          className={style.Navigation__list__item}
          onClick={(e) => handleSelect(e)}
        >
          Список операций
        </li>
        <li
          className={style.Navigation__list__item}
          onClick={(e) => handleSelect(e)}
        >
          История посещений обменников
        </li>
        <Link
          className={style.Navigation__list__item}
          onClick={(e) => handleSelect(e)}
          to="/account/accountSettings"
        >
          настройки аккаунта
        </Link>
        <Link
          className={style.Navigation__list__item}
          onClick={(e) => handleSelect(e)}
          to="/accountReviews"
        >
          Мои отзывы
        </Link>
        <Link
          className={style.Navigation__list__item}
          onClick={(e) => handleSelect(e)}
          to="/account/favoriteexchangers"
        >
          Избранные обменники
        </Link>
        <li className={style.Navigation__list__item} onClick={LogOut}>
          Выйти из Аккаунта
        </li>
      </ul>
    </nav>
  );
}
