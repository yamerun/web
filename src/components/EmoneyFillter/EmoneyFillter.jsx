import React, { useEffect } from "react";
import style from "./Emoney.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setEmoneyReducer,
  setEmoneyReducer2,
  setFillteredItemsEmoneyReducer,
  setItemsEmoneyReducer,
  setItemsEmoneyReducer2,
} from "../../store/itemsSlice/itemsSlice";
export const EmoneyFillter = () => {
  const dispatch = useDispatch();
  const { Emoney, items, itemsbyEmoney, Emoney2, itemsbyEmoney2 } = useSelector(
    (state) => ({
      Emoney: state.itemsSlice.Emoney,
      items: state.itemsSlice.items,
      itemsbyEmoney: state.itemsSlice.itemsbyEmoney,
      Emoney2: state.itemsSlice.Emoney2,
      itemsbyEmoney2: state.itemsSlice.itemsbyEmoney2,
    })
  );

  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/exchangers/currencies/types`)
      .then(function (response) {
      })
      .catch(function (error) {});
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://146.59.87.222/api/exchangers/currencies/list?currency_type_id=1`
      )
      .then(function (response) {
        console.log(response.data.data);
      })
      .catch(function (error) {});
  }, []);

  const getEmoney = (title, e) => {
    dispatch(setEmoneyReducer(title));
    dispatch(setItemsEmoneyReducer(Emoney));

    const btnElements = document.querySelectorAll(
      `.${style.ItemsPayment__item}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }


  };

  useEffect(() => {
    dispatch(setItemsEmoneyReducer(Emoney));
    dispatch(setItemsEmoneyReducer2(Emoney2));
  }, [Emoney, Emoney2]);

  const getEmoney2 = (title, e) => {
    dispatch(setEmoneyReducer2(title));
    dispatch(setItemsEmoneyReducer2(Emoney2));
    const btnElements = document.querySelectorAll(
      `.${style.ItemsPayment__item2}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
  };


  return (
    <div className={style.ItemsPayment}>
      <ul className={style.ItemsPayment__itemsList}>
        {items.map((item) => (
          <li
            className={style.ItemsPayment__item}
            onClick={(e) => getEmoney(item.currency_type, e)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <ul className={style.ItemsPayment__itemsList}>
        {items.map((item) => (
          <li
            className={style.ItemsPayment__item2}
            onClick={(e) => getEmoney2(item.currency_type, e)}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
