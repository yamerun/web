import React, { useRef, useEffect, useState } from "react";
import style from "./SearchMenu.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setItemsReducer } from "../../store/itemsSlice/itemsSlice";
import { setitemIdReducer } from "../../store/itemsSlice/itemsSlice";
import { setitemExchangeRatesReducer } from "../../store/itemsSlice/itemsSlice";
import { setitemexchangeIdReducer } from "../../store/itemsSlice/itemsSlice";
import { setItemReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemFromReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemToReducer } from "../../store/itemsSlice/itemsSlice";
import axios from "axios";

export const SearchMenu = () => {
  const ref = useRef(null);
  const {
    items,
    filltered,
    filltered2,
    currentTo,
    currentFrom,
  } = useSelector((state) => ({
    items: state.itemsSlice.items,
    itemId: state.itemsSlice.itemId,
    exchangeId: state.itemsSlice.exchangeId,
    item: state.itemsSlice.item,
    currentTo: state.itemsSlice.currentTo,
    currentFrom: state.itemsSlice.currentFrom,
  }));
  const dispatch = useDispatch();

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

  const getItemTo = (e, exchanger) => {
    dispatch(setCurrentItemToReducer(e.target.textContent));
    console.log(currentTo);
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

  return (
    <div className={style.SearchMenu}>
      <div className={style.SearchMenu__inputs}>
        <div className={style.SearchMenu__contolls}>
          <input
            className={style.SearchMenu__inputField}
            placeholder="Отдаете"
          />
          <button className={style.SearchMenu__btn} />
        </div>
        <div className={style.SearchMenu__separation}></div>
        <div className={style.SearchMenu__contolls}>
          <input
            className={style.SearchMenu__inputField}
            placeholder="Получаете"
          />
          <button className={style.SearchMenu__btn} />
        </div>
      </div>
      <div className={style.SearchMenu__items} ref={ref}>
        <ul className={style.SearchMenu__itemsList}>
          {items.map((item) => (
            <li
              className={style.SearchMenu__item}
              id={item.id}
              onClick={(e) => getItemFrom(e)}
            >
              {item.currency}
            </li>
          ))}
        </ul>
        <ul className={style.SearchMenu__itemsList}>
          {items.map((item) => (
            <li
              className={style.SearchMenu__item}
              id={item.id}
              onClick={(e) => getItemTo(e)}
            >
              {item.currency}
            </li>
          ))}
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

/*   {filltered2.length != 0 ? (
            <>
              {filltered2.map((item) => (
                <li className={style.SearchMenu__item} id={item.id}>
                  {item.to}
                </li>
              ))}
            </>
          ) : (
            <>
              {variants.length != 0 ? (
                <>
                  {variants.map((item) => (
                    <li className={style.SearchMenu__item} id={item.id}>
                      {item.to}
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {items.map((item) => (
                    <li className={style.SearchMenu__item} id={item.id}>
                      {item.to}
                    </li>
                  ))}
                </>
              )}
            </>
          )} */

//useEffect(() => {
// axios
// .get(
// `http://146.59.87.222/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${item}`
//  )
// .then(function (response) {
//   dispatch(setVariantsReducer(response.data.data));
//   })
//  .catch(function (error) {});
// }, [item]);
