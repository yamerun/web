import React, { useEffect, useState, useRef } from "react";
import style from "./Calculator.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setCalculated,
  setisTwice,
  setitemExchangeRatesReducer,
} from "../../store/itemsSlice/itemsSlice";

export const Calculator = () => {
  const dispatch = useDispatch();
  const { calculated, currentTo, currentFrom } = useSelector((state) => ({
    calculated: state.itemsSlice.calculated,
    currentTo: state.itemsSlice.currentTo,
    currentFrom: state.itemsSlice.currentFrom,
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
          `http://146.59.87.222/api/calc?quantity=${val2}&from=${currentFrom}&to=${currentTo}&is_give=false&is_commission=false`
        )
        .then(function (response) {
          dispatch(setitemExchangeRatesReducer(response.data.data));
          dispatch(setCalculated(true));
          dispatch(setisTwice(false));
        })
        .then(function (response) {})
        .catch(function (error) {});
    }

    if (inputGive.current.value.length !== 0) {
      axios
        .get(
          `http://146.59.87.222/api/calc?quantity=${val}&from=${currentFrom}&to=${currentTo}&is_give=true&is_commission=false`
        )
        .then(function (response) {
          dispatch(setitemExchangeRatesReducer(response.data.data));
          dispatch(setCalculated(true));
          dispatch(setisTwice(false));
        })
        .then(function (response) {})
        .catch(function (error) {});
    }
  };
  const clearCalculate = () => {
    dispatch(setCalculated(false));
  };

  return (
    <div className={style.Calculator}>
      <div className={style.Calculator__container}>
        <div className={style.Calculator__container__info}>
          <div className={style.Calculator__container__info__item}>
            <span>Oтдаете : </span>
            <input
              className={style.Calculator__container__info__item__input}
              onChange={(e) => setCalculetedAmountGive(e)}
              type="number"
              min="0"
              ref={inputGive}
            />
            <span className={style.Calculator__container__info__item__name}>

              {currentFrom}
            </span>
          </div>
          <div className={style.Calculator__container__info__item}>
            <span>Получаете : </span>
            <input
              className={style.Calculator__container__info__item__input}
              onChange={(e) => setCalculetedAmountGet(e)}
              ref={inputGet}
            />
            <span className={style.Calculator__container__info__item__name}>
              {currentTo}
            </span>
          </div>
        </div>
        <button
          className={style.Calculator__inputControlls__btn}
          onClick={getCalculatedValue}
        >
          Рассчитать
        </button>
        <div className={style.Calculator__inputControlls}>
          <button className={style.Calculator__inputControlls__btn}>
            Без комиссий ПС
          </button>
          <button
            onClick={clearCalculate}
            className={style.Calculator__inputControlls__btn}
          >
            Очистить фильтры
          </button>
        </div>
      </div>
    </div>
  );
};
