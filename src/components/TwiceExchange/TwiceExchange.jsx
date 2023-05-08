import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import style from "./TwiceExchange.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTwiceExchanger, setisTwice, setitemExchangeRatesReducer } from "../../store/itemsSlice/itemsSlice";
export const TwiceExchange = () => {
  const dispatch = useDispatch()
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
          `https://change.pro/api/twice_exchange?quantity=${val2}&from=${currentFrom}&to=${currentTo}&is_give=false&is_commission=false`
        )
        .then(function (response) {
          dispatch(setTwiceExchanger(response.data.data))
          dispatch(setisTwice(true))
        })
        .then(function (response) {})
        .catch(function (error) {});
    }

    if (inputGive.current.value.length !== 0) {
      axios
        .get(
          `https://change.pro/api/twice_exchange?quantity=${val}&from=${currentFrom}&to=${currentTo}&is_give=true&is_commission=false`
        )
        .then(function (response) {
         dispatch(setTwiceExchanger(response.data.data))
         dispatch(setisTwice(true))
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
      <div className={style.TwiceChange__btnBox}>
      <button className={style.TwiceChange__btn}>Без комиссий ПС</button>
      <button className={style.TwiceChange__btn}>Очистить фильтры</button>
      </div>

    </div>
  );
};
