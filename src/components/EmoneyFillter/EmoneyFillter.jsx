import React, { useEffect, useState } from "react";
import style from "./Emoney.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentItemToReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemFromReducer } from "../../store/itemsSlice/itemsSlice";
import { setIsFilltersClear } from "../../store/itemsSlice/itemsSlice";
export const EmoneyFillter = () => {
  const dispatch = useDispatch();
  const { items, isFilltersClear } = useSelector((state) => ({
    items: state.itemsSlice.items,
    isFilltersClear: state.itemsSlice.isFilltersClear,
  }));
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  const getEmoney = (title, e) => {
    setFrom(title);
    const btnElements = document.querySelectorAll(
      `.${style.ItemsPayment__item}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
    dispatch(setIsFilltersClear(false));
  };

  const getEmoney2 = (title, e) => {
    setTo(title);
    const btnElements = document.querySelectorAll(
      `.${style.ItemsPayment__item2}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
    dispatch(setIsFilltersClear(false));
  };

  useEffect(() => {
    dispatch(setCurrentItemFromReducer(from));
    dispatch(setCurrentItemToReducer(to));
  }, [from, to]);

  useEffect(() => {
    if (isFilltersClear === true) {
    const btnElements = document.querySelectorAll(
      `.${style.ItemsPayment__item}`
    );
    for (let i of btnElements) {
      i.classList.remove(`${style.active}`);
    }
    const btnElements2 = document.querySelectorAll(
      `.${style.ItemsPayment__item2}`
    );
    for (let i of btnElements2) {
      i.classList.remove(`${style.active}`);
    }
  }
  }, [isFilltersClear]);

  return (
    <div className={style.ItemsPayment}>
      <ul className={style.ItemsPayment__itemsList}>
        {items.map((item) => (
          <li
            className={style.ItemsPayment__item}
            onClick={(e) => getEmoney(item.title, e)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <ul className={style.ItemsPayment__itemsList}>
        {items.map((item) => (
          <li
            className={style.ItemsPayment__item2}
            onClick={(e) => getEmoney2(item.title, e)}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
