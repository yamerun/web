import React from "react";
import style from "./ExchangerAccountNavigation.module.scss";
import { Link } from "react-router-dom";
export const ExchangerAccountNavigation = () => {
  return (
    <nav className={style.exchangerNavigation}>
      <ul className={style.exchangerNavigation__itemsList}>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to={`/exchanger/info`}
        >
          Информация
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/exchanger/reviews"
        >
          Отзывы
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/exchanger/courses"
        >
          Курсы
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/exchanger/marks"
        >
          Метки
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/Exchanger/notifications"
        >
          Уведомления
        </Link>
        <Link
          className={style.exchangerNavigation__itemsList__item}
          to="/exchanger/scammers"
        >
          Мошенники
        </Link>
      </ul>
    </nav>
  );
};
