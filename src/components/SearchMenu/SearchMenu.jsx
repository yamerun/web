import React, { useRef, useEffect, useState } from "react";
import style from "./SearchMenu.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setFillterItems2Reducer,
  setFillterItemsReducer,
  setItemsReducer,
} from "../../store/itemsSlice/itemsSlice";
import { setitemIdReducer } from "../../store/itemsSlice/itemsSlice";
import { setitemExchangeRatesReducer } from "../../store/itemsSlice/itemsSlice";
import { setitemexchangeIdReducer } from "../../store/itemsSlice/itemsSlice";
import { setItemReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemFromReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemToReducer } from "../../store/itemsSlice/itemsSlice";
import axios from "axios";

export const SearchMenu = () => {
  const ref = useRef(null);
  const { items, currentTo, currentFrom, filltered, filltered2 } = useSelector(
    (state) => ({
      items: state.itemsSlice.items,
      currentTo: state.itemsSlice.currentTo,
      currentFrom: state.itemsSlice.currentFrom,
      filltered: state.itemsSlice.filltered,
      filltered2: state.itemsSlice.filltered2,
    })
  );
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInput2Value] = useState("");

  const testArr3 = [
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
  ];
  const testArr4 = [
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
    "заглушка",
  ];

  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/exchangers/currencies/list`)
      .then(function (response) {
        dispatch(setItemsReducer(response.data.data));
      })
      .catch(function (error) {});
  }, []);

  const ShowMore = () => {
    ref.current.classList.toggle(`${style.show}`);
  };

  const getItemFrom = (e, exchanger) => {
    dispatch(setitemIdReducer(e.target.id));
    dispatch(setitemexchangeIdReducer(exchanger));
    dispatch(setCurrentItemFromReducer(e.target.textContent));
    dispatch(setItemReducer(e.target.textContent));
    console.log(currentFrom);
  };

  useEffect(() => {}, [filltered, filltered2]);

  useEffect(() => {
    axios
      .get(
        `http://146.59.87.222/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${currentFrom}&to=${currentTo}&limit=50`
      )
      .then(function (response) {
        dispatch(setitemExchangeRatesReducer(response.data.data));
      })
      .catch(function (error) {});
  }, [currentFrom, currentTo]);

  const setInputValueForSearch = (e) => {
    setInputValue(e.target.value);
    dispatch(setFillterItemsReducer(inputValue));
  };

  const setInputValue2ForSearch = (e) => {
    setInput2Value(e.target.value);
    dispatch(setFillterItems2Reducer(inputValue2));
  };

  return (
    <div className={style.SearchMenu}>
      <div className={style.SearchMenu__inputs}>
        <div className={style.SearchMenu__contolls}>
          <input
            className={style.SearchMenu__inputField}
            placeholder="Отдаете"
            onChange={(e) => setInputValueForSearch(e)}
            value={inputValue}
          />
          <button className={style.SearchMenu__btn} />
        </div>
        <div className={style.SearchMenu__separation}></div>
        <div className={style.SearchMenu__contolls}>
          <input
            className={style.SearchMenu__inputField}
            placeholder="Получаете"
            onChange={(e) => setInputValue2ForSearch(e)}
            value={inputValue2}
          />
          <button className={style.SearchMenu__btn} />
        </div>
      </div>
      <div className={style.SearchMenu__items} ref={ref}>
        <ul className={style.SearchMenu__itemsList}>
          {inputValue.length != 0 ? (
            <>
              {filltered.map((item) => (
                <li
                  className={style.SearchMenu__item}
                  id={item.id}
                  onClick={(e) => getItemFrom(e)}
                >
                  {item.currency}
                </li>
              ))}
            </>
          ) : (
            <>
              {items.map((item) => (
                <li
                  className={style.SearchMenu__item}
                  id={item.id}
                  onClick={(e) => getItemFrom(e)}
                >
                  {item.currency}
                </li>
              ))}
            </>
          )}
        </ul>
        <ul className={style.SearchMenu__itemsList}>
          {inputValue2.length != 0 ? (
            <>
              {filltered2.map((item) => (
                <li
                  className={style.SearchMenu__item}
                  id={item.id}
                  onClick={(e) => getItemFrom(e)}
                >
                  {item.currency}
                </li>
              ))}
            </>
          ) : (
            <>
              {items.map((item) => (
                <li
                  className={style.SearchMenu__item}
                  id={item.id}
                  onClick={(e) => getItemFrom(e)}
                >
                  {item.currency}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
      <div className={style.SearchMenu__itemsPayment__header}>
        <p className={style.SearchMenu__itemsPayment__header__content}>
          Электронные деньги
        </p>
      </div>
      <div className={style.SearchMenu__itemsPayment}>
        <ul className={style.SearchMenu__itemsList}>
          {testArr3.map((item) => (
            <li className={style.SearchMenu__item}>{item}</li>
          ))}
        </ul>
        <ul className={style.SearchMenu__itemsList}>
          {testArr4.map((item) => (
            <li className={style.SearchMenu__item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={style.SearchMenu__ShowMore}>
        <button
          className={style.SearchMenu__ShowMorebtn}
          onClick={() => ShowMore()}
        />
      </div>
    </div>
  );
};



 





