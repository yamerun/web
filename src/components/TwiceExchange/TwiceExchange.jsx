import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import style from "./TwiceExchange.module.scss";
import axios from "axios";

export const TwiceExchange = () => {
  const { currentFrom, currentTo } = useSelector((state) => ({
    currentFrom: state.itemsSlice.currentFrom,
    currentTo: state.itemsSlice.currentTo,
  }));

  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");
  const inputGive = useRef(null);
  const inputGet = useRef(null);

  const setCalculetedAmountGive = (e) => {
    setVal(e.target.value);

    if (inputGive.current.value.length !== 0) {
      setVal(e.target.value);
      inputGet.current.disabled = true;
    } else inputGet.current.disabled = false;
  };

  const setCalculetedAmountGet = (e) => {
    if (inputGet.current.value.length !== 0) {
      setVal2(e.target.value);
      inputGive.current.disabled = true;
    } else inputGive.current.disabled = false;
  };

  const getCalculatedValue = () => {
    if (inputGet.current.value.length !== 0) {
      axios
        .get(
          `http://146.59.87.222/api/twice_exchange?quantity=${val2}&from=${currentFrom}&to=${currentTo}&is_give=false&is_commission=false`
        )
        .then(function (response) {
          console.log(response);
        })
        .then(function (response) {})
        .catch(function (error) {});
    }

    if (inputGive.current.value.length !== 0) {
      axios
        .get(
          `http://146.59.87.222/api/twice_exchange?quantity=${val}&from=${currentFrom}&to=${currentTo}&is_give=true&is_commission=false`
        )
        .then(function (response) {
          console.log(response);
        })
        .then(function (response) {})
        .catch(function (error) {});
    }
  };

  return (
    <div className={style.TwiceChange}>
      <div className={style.TwiceChange__inputMenu}>
        <div className={style.TwiceChange__container}>
          <h1 className={style.TwiceChange__container__text}>Отдаете : </h1>
          <input
            className={style.TwiceChange__container__input}
            onChange={(e) => setCalculetedAmountGive(e)}
            ref={inputGive}
          />
          <h1 className={style.TwiceChange__container__currentFrom}>
            {currentFrom}
          </h1>
        </div>
        <div className={style.TwiceChange__container}>
          <h1 className={style.TwiceChange__container__text}>Получаете : </h1>
          <input
            className={style.TwiceChange__container__input}
            onChange={(e) => setCalculetedAmountGet(e)}
            ref={inputGet}
          />
          <h1 className={style.TwiceChange__container__currentTo}>
            {currentTo}
          </h1>
        </div>
      </div>

      <button className={style.TwiceChange__btn} onClick={getCalculatedValue}>
        Рассчитать
      </button>
      <button className={style.TwiceChange__btn}>Без комиссий ПС</button>
      <button className={style.TwiceChange__btn}>Очистить фильтры</button>
    </div>
  );
};
