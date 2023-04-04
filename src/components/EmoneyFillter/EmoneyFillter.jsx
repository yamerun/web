import React, { useEffect,useState } from "react";
import style from "./Emoney.module.scss";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentItemToReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemFromReducer } from "../../store/itemsSlice/itemsSlice";
import { useCallback } from "react";
export const EmoneyFillter = () => {
  const dispatch = useDispatch();
  const { Emoney, items, Emoney2,currentTo,currentFrom } = useSelector((state) => ({
    Emoney: state.itemsSlice.Emoney,
    items: state.itemsSlice.items,
    Emoney2: state.itemsSlice.Emoney2,
    currentTo: state.itemsSlice.currentTo,
    currentFrom: state.itemsSlice.currentFrom,
  }));
 const [to,setTo] = useState('')
 const [from,setFrom] = useState('')

  const getEmoney = (title, e) => {
    setFrom(title)
    const btnElements = document.querySelectorAll(
      `.${style.ItemsPayment__item}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
  }

  const getEmoney2 = (title, e) => {
    setTo(title)

    const btnElements = document.querySelectorAll(
      `.${style.ItemsPayment__item2}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
  }

useEffect(()=>{
  dispatch(setCurrentItemFromReducer(from))
  dispatch(setCurrentItemToReducer(to))
  console.log(to)
  console.log(from)
},[from,to])
  

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
