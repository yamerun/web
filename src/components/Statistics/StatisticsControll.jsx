import React, { useEffect, useState } from "react";
import style from "./Statistics.module.scss";
import img from "../../assets/imgs/buttonOpen.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

export const StatisticsControll = ({
  funcGetStat,
  openMenu,
  funcGetCurHour,
  active,
  currentHour,
}) => {
  const dispatch = useDispatch();
  const { currentFrom, currentTo,perHour} = useSelector((state) => ({
    currentFrom: state.itemsSlice.currentFrom,
    currentTo: state.itemsSlice.currentTo,
    perHour:state.itemsSlice.perHour
  }));

  const menuElements = [1, 3, 6, 12, 24];


  useEffect(() => {
    if (currentFrom && currentTo != undefined)
      axios
        .get(
          `https://change.pro/api/rate_statistics/best_rate?from=${currentTo}&to=${currentFrom}&perHour=${perHour}`
        )
        .then(function (response) {
          dispatch(setStatistics(response.data.data));
        });
  }, [currentFrom, currentTo, perHour]);


  return (
    <div className={style.statistics}>
      <div className={style.statistics__container}>
        <div className={style.statistics__container__controlls}>
          <h1 className={style.statistics__container__controlls__header}>
            График
          </h1>
          <div className={style.statistics__container__controlls__btnBox}>
            <button
              className={style.statistics__container__controlls__btnBox__btn1}
            >
              Изменения курса обмена
            </button>
            <img
              src={img}
              className={style.statistics__container__controlls__btnBox__icon}
            />
          </div>
          <h1 className={style.statistics__container__controlls__header}>за</h1>
          <div className={style.statistics__container__controlls__body}>
            <div
              className={style.statistics__container__controlls__body__menu}
              onClick={openMenu}
            >
              {currentHour}
              {active === true && (
                <nav
                  className={
                    style.statistics__container__controlls__body__menu__selector
                  }
                >
                  <ul
                    className={
                      style.statistics__container__controlls__body__menu__selector__list
                    }
                  >
                    {menuElements.map((item) => (
                      <li
                        className={
                          style.statistics__container__controlls__body__menu__selector__list__item
                        }
                        onClick={(e) => funcGetCurHour(e)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
            <p className={style.statistics__container__controlls__body__text}>
              часа
            </p>
          </div>
          <button
            className={style.statistics__container__controlls__btn3}
            onClick={funcGetStat}
          >
            показать
          </button>
        </div>
      </div>
    </div>
  );
};

//
