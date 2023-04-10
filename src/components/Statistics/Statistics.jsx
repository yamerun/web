import React, { useState } from "react";
import style from "./Statistics.module.scss";
import img from "../../assets/imgs/buttonOpen.svg";
import { LineChart } from "../Chart/LineChart";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setStatisticPerHour } from "../../store/itemsSlice/itemsSlice";
export const Statistics = () => {
  const dispatch = useDispatch();
  const { perHour } = useSelector((state) => ({
    perHour: state.itemsSlice.perHour,
  }));
  const [inputVal, setInputVal] = useState();

  const setPerHour = (e) => {
    setInputVal(e.target.value);
  };

  const getStatByPerHour = () => {
    dispatch(setStatisticPerHour(inputVal));
  };

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
            <input
              className={style.statistics__container__controlls__body__input}
              onChange={(e) => setPerHour(e)}
              type="number"
              min="1"
              max="24"
            />
            <p className={style.statistics__container__controlls__body__text}>
              часа
            </p>
          </div>
          <button
            className={style.statistics__container__controlls__btn3}
            onClick={getStatByPerHour}
          >
            показать
          </button>
        </div>
        <div>
          <LineChart />
        </div>
      </div>
    </div>
  );
};
