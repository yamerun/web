import React, { useRef, useEffect, useState, useMemo } from "react";
import style from "./SearchMenu.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setFillterItems2Reducer,
  setFillterItemsReducer,
  setItems2Reducer,
  setItemsReducer,
} from "../../store/itemsSlice/itemsSlice";
import { setitemIdReducer } from "../../store/itemsSlice/itemsSlice";
import { setitemExchangeRatesReducer } from "../../store/itemsSlice/itemsSlice";
import { setItemReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemFromReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemToReducer } from "../../store/itemsSlice/itemsSlice";
import { EmoneyFillter } from "../EmoneyFillter/EmoneyFillter";
import { setIsFilltersClear } from "../../store/itemsSlice/itemsSlice";
import axios from "axios";

export const SearchMenu = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const { items, Emoney, Emoney2, isFilltersClear } =
    useSelector((state) => ({
      items: state.itemsSlice.items,
      Emoney: state.itemsSlice.Emoney,
      Emoney2: state.itemsSlice.Emoney2,
      calculated: state.itemsSlice.calculated,
      isFilltersClear: state.itemsSlice.isFilltersClear
    }));
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInput2Value] = useState("");

  useEffect(() => {
    axios
      .get(`https://change.pro/api/exchangers/currencies/list`)
      .then(function (response) {
        dispatch(setItemsReducer(response.data.data));
        dispatch(setItems2Reducer(response.data.data));
      })
      .catch(function (error) { });
  }, []);

  const ShowMore = () => {
    ref.current.classList.toggle(`${style.show}`);
  };
  const ShowMoreToBot = () => {
    ref2.current.classList.toggle(`${style.showEmoney}`);
  };
  const getItemFrom = (e, exchanger) => {
    dispatch(setitemIdReducer(e.target.id));
    dispatch(setCurrentItemFromReducer(e.target.textContent));
    dispatch(setItemReducer(e.target.textContent));
    const btnElements = document.querySelectorAll(`.${style.SearchMenu__item}`);
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
    dispatch(setIsFilltersClear(false))
  };
  const getItemTo = (e) => {
    dispatch(setCurrentItemToReducer(e.target.textContent));
    const btnElements = document.querySelectorAll(
      `.${style.SearchMenu__item2}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
    dispatch(setIsFilltersClear(false))
  };

  useEffect(() => {
    if (isFilltersClear === true) {
      const btnElements = document.querySelectorAll(`.${style.SearchMenu__item}`);
      for (let i of btnElements) {
        i.classList.remove(`${style.active}`);
      }
      const btnElements2 = document.querySelectorAll(
        `.${style.SearchMenu__item2}`
      );
      for (let i of btnElements2) {
          i.classList.remove(`${style.active}`);
      }
    }
  }, [isFilltersClear])


  const setInputValueForSearch = (e) => {
    const translitMap = {
      й: "q",
      ц: "w",
      у: "e",
      к: "r",
      е: "t",
      н: "y",
      г: "u",
      ш: "i",
      щ: "o",
      з: "p",
      х: "[",
      ъ: "]",
      ф: "a",
      ы: "s",
      в: "d",
      а: "f",
      п: "g",
      р: "h",
      о: "j",
      л: "k",
      д: "l",
      ж: ";",
      э: "'",
      я: "z",
      ч: "x",
      с: "c",
      м: "v",
      и: "b",
      т: "n",
      ь: "m",
      б: ",",
      ю: ".",
    };
    let result = "";
    for (let i = 0; i < e.target.value.length; i++) {
      const char = e.target.value.charAt(i);
      const translitChar = translitMap[char.toLowerCase()] || char;
      result +=
        char === char.toLowerCase() ? translitChar : translitChar.toUpperCase();
    }
    setInputValue(result);
    dispatch(setFillterItemsReducer(result));
  };
  const setInputValue2ForSearch = (e) => {
    const translitMap = {
      й: "q",
      ц: "w",
      у: "e",
      к: "r",
      е: "t",
      н: "y",
      г: "u",
      ш: "i",
      щ: "o",
      з: "p",
      х: "[",
      ъ: "]",
      ф: "a",
      ы: "s",
      в: "d",
      а: "f",
      п: "g",
      р: "h",
      о: "j",
      л: "k",
      д: "l",
      ж: ";",
      э: "'",
      я: "z",
      ч: "x",
      с: "c",
      м: "v",
      и: "b",
      т: "n",
      ь: "m",
      б: ",",
      ю: ".",
    };
    let result = "";
    for (let i = 0; i < e.target.value.length; i++) {
      const char = e.target.value.charAt(i);
      const translitChar = translitMap[char.toLowerCase()] || char;
      result +=
        char === char.toLowerCase() ? translitChar : translitChar.toUpperCase();
    }
    setInput2Value(result);
    dispatch(setFillterItems2Reducer(result));
  };
  const result = useMemo(() => {
    if (inputValue.length !== 0) {
      return items.filter((item) =>
        item.currency.toLowerCase().includes(inputValue.toLocaleLowerCase())
      );
    } else return items;
  }, [inputValue, Emoney, items]);

  const result2 = useMemo(() => {
    if (inputValue2.length !== 0) {
      return items.filter((item) =>
        item.currency.toLowerCase().includes(inputValue2.toLocaleLowerCase())
      );
    } else return items;
  }, [inputValue2, Emoney2, items]);

  const ShowMoreEmoney = () => {
    ref2.current.classList.toggle(`${style.showEmoney}`);
  };

  return (
    <div className={style.SearchMenu} ref={ref3}>
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
      <div className={style.SearchMenu__itemsPayment__header}>
        <p className={style.SearchMenu__itemsPayment__header__content}>
          Криптовалюта
        </p>
      </div>
      <button
        className={style.SearchMenu__ShowMorebtn}
        onClick={() => ShowMore()}
      />
      <div className={style.SearchMenu__items} ref={ref}>
        <ul className={style.SearchMenu__itemsList}>
          {result.map((item) => (
            <li
              className={style.SearchMenu__item}
              id={item.id}
              onClick={(e) => getItemFrom(e, item)}
            >
              {item.currency}
            </li>
          ))}
        </ul>
        <ul className={style.SearchMenu__itemsList}>
          {result2.map((item) => (
            <li
              className={style.SearchMenu__item2}
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
      <button
        className={style.SearchMenu__ShowMorebtn}
        onClick={() => ShowMoreEmoney()}
      />
      <div className={style.SearchMenu__Emoney} ref={ref2}>
        <EmoneyFillter />
      </div>
      <div className={style.SearchMenu__ShowMore}>
        <button
          className={style.SearchMenu__ShowMorebtn}
          onClick={() => ShowMoreToBot()}
        />
      </div>
    </div>
  );
};
