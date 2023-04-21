import React from "react";
import style from "./ExchangerAccountNavigation.module.scss";
import { Link } from "react-router-dom";
export const ExchangerAccountNavigation = () => {
  return (
    <nav className={style.exchangerNavigation}>
      <ul className={style.exchangerNavigation__itemsList}>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/infoPage"
        >
          Информация
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/ExchangerReviews"
        >
          Отзывы
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/ExchangerCourses"
        >
          Курсы
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/ExchangerMarks"
        >
          Метки
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/ExchangerNotifications"
        >
          Уведомления
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/scammersBase"
        >
          Мошенники
        </Link>
      </ul>
    </nav>
  );
};
