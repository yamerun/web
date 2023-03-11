import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import style from "./SearchMenu.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setItemsReducer } from "../../store/itemsSlice/itemsSlice";
import { setFillterItemsReducer } from "../../store/itemsSlice/itemsSlice";
import { setitemIdReducer } from "../../store/itemsSlice/itemsSlice";
import { setitemExchangeRatesReducer } from "../../store/itemsSlice/itemsSlice";
import { setitemexchangeIdReducer } from "../../store/itemsSlice/itemsSlice";
import axios from "axios";

export const SearchMenu = () => {
  const ref = useRef(null);
  const { items, filltered, itemId, exchangeId } = useSelector((state) => ({
    items: state.itemsSlice.items,
    filltered: state.itemsSlice.filltered,
    itemId: state.itemsSlice.itemId,
    exchangeId: state.itemsSlice.exchangeId,
  }));
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState("");

  const testArr3 = ["123asd123", "123as123d"];
  const testArr4 = ["123asd123", "123as123d"];

  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/exchangers/currencies/list`)
      .then(function (response) {
        dispatch(setItemsReducer(response.data.data));
      })
      .catch(function (error) {});
  }, [items]);

  const ShowMore = () => {
    ref.current.classList.toggle(`${style.show}`);
  };

  const inputValueTransform = (e) => {
    setInputVal(e.target.value);
    if (e.target.value.length == 0) {
      dispatch(setFillterItemsReducer(""));
    }
  };

  const inputValueSearch = () => {
    dispatch(setFillterItemsReducer(inputVal));
  };

  const getItem = (e, exchanger) => {
    dispatch(setitemIdReducer(e.target.id));
    dispatch(setitemexchangeIdReducer(exchanger));
  };

  useEffect(() => {}, [filltered]);

  useEffect(() => {
    axios
      .get(
        `http://146.59.87.222/api/exchangers/currencies/get?orderBy=amount&sort=asc&id=${itemId}`
      )
      .then(function (response) {
        dispatch(setitemExchangeRatesReducer(response.data.data));
      })
      .catch(function (error) {});
  }, [itemId]);

  return (
    <div className={style.SearchMenu}>
      <div className={style.SearchMenu__inputs}>
        <div className={style.SearchMenu__contolls}>
          <input
            className={style.SearchMenu__inputField}
            placeholder="Отдаете"
            onChange={(e) => inputValueTransform(e)}
          />
          <button
            className={style.SearchMenu__btn}
            onClick={() => inputValueSearch()}
          />
        </div>
        <div className={style.SearchMenu__separation}></div>
        <div className={style.SearchMenu__contolls}>
          <input
            className={style.SearchMenu__inputField}
            placeholder="Получаете"
            disabled
          />
        </div>
      </div>
      <div className={style.SearchMenu__items} ref={ref}>
        {filltered.length != 0 ? (
          <>
            <ul className={style.SearchMenu__itemsList}>
              {filltered.map((item) => (
                <li
                  className={style.SearchMenu__item}
                  id={item.id}
                  onClick={(e) => getItem(e)}
                >
                  {item.from}
                </li>
              ))}
            </ul>
            <ul className={style.SearchMenu__itemsList}>
              {filltered.map((item) => (
                <li className={style.SearchMenu__item} id={item.id}>
                  {item.to}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <ul className={style.SearchMenu__itemsList}>
              {items.map((item) => (
                <li
                  className={style.SearchMenu__item}
                  onClick={(e) => getItem(e, item.exchanger_id)}
                  id={item.id}
                  exchange={item.exchanger_id}
                >
                  {item.from}
                </li>
              ))}
            </ul>
            <ul className={style.SearchMenu__itemsList}>
              {items.map((item) => (
                <li className={style.SearchMenu__item} id={item.id}>
                  {item.to}
                </li>
              ))}
            </ul>
          </>
        )}
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
