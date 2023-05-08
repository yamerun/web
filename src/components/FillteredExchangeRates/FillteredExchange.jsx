import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./FillteredExchange.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setitemExchangeRatesReducer } from "../../store/itemsSlice/itemsSlice";
import { TwiceChanhgeExchanger } from "../TwiceChangeExchanger/TwiceChange";
import axios from "axios";
import { Marks } from "../Marks/Marks";
export const FillteredExchangeRates = () => {
  const dispatch = useDispatch();
  const { itemExchangeRates, calculated, currentFrom, currentTo, isTwice } =
    useSelector((state) => ({
      itemExchangeRates: state.itemsSlice.itemExchangeRates,
      calculated: state.itemsSlice.calculated,
      currentFrom: state.itemsSlice.currentFrom,
      currentTo: state.itemsSlice.currentTo,
      isTwice: state.itemsSlice.isTwice,
    }));

  useEffect(() => {
    if (calculated !== true) {
      axios
        .get(
          `https://change.pro/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${currentFrom}&to=${currentTo}&limit=50`
        )
        .then(function (response) {
          dispatch(setitemExchangeRatesReducer(response.data.data));
        })
        .then(function (response) {})
        .catch(function (error) {});
      const get = setInterval(() => {
        axios
          .get(
            `https://change.pro/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${currentFrom}&to=${currentTo}&limit=50`
          )
          .then(function (response) {
            dispatch(setitemExchangeRatesReducer(response.data.data));
            console.log(response.data.data)
          })
          .then(function (response) {})
          .catch(function (error) {});
      }, 3000);

      return () => clearInterval(get);
    }
  }, [currentTo, currentFrom, calculated]);

  const openItemSite = (url) => {
    window.open(`${url}`);
  };
  return isTwice === true ? (
    <TwiceChanhgeExchanger />
  ) : (
    <div>

      {itemExchangeRates.map((item) => (
        <div className={style.Fillters__categories__body__content}>
          <div className={style.Fillters__categories__body__content__excahange}>
            <Link
              to={`/${item.exchanger.id}`}
              className={
                style.Fillters__categories__body__content__excahange__btn
              }
            />
            <p
              className={
                style.Fillters__categories__body__content__excahange__header
              }
              onClick={() => openItemSite(item.exchanger.site_url)}
            >
              {item.exchanger.name}
            </p>
          </div>
          {
            item.marks.length !== 0 && (
              <Marks prop={item.marks}/>
            )
          }

          <div className={style.Fillters__categories__body__content__from}>
            <p
              className={
                style.Fillters__categories__body__content__from__header
              }
            >
              {Math.floor(item.in)}
            </p>
            <p
              className={
                style.Fillters__categories__body__content__from__header2
              }
            >
              {item.from}
            </p>
          </div>
          <div className={style.Fillters__categories__body__content__to}>
            <p
              className={style.Fillters__categories__body__content__to__header}
            >
              {(Math.round(item.out * 100) / 100).toFixed(2)}
            </p>
            <p
              className={style.Fillters__categories__body__content__to__header2}
            >
              {item.to}
            </p>
          </div>
          <div className={style.Fillters__categories__body__content__reserve}>
            <p
              className={
                style.Fillters__categories__body__content__reserve__header
              }
            >
              {(Math.round(item.amount * 100) / 100).toFixed(2)}
            </p>
          </div>
          <div className={style.Fillters__categories__body__content__comment}>
            <p
              className={
                style.Fillters__categories__body__content__comment__header
              }
            >
              {item.exchanger.user_reviews}
            </p>
            <p
              className={
                style.Fillters__categories__body__content__comment__header
              }
              style={
                item.exchanger.count_reviews == 0
                  ? { color: "red" }
                  : { color: "white" }
              }
            >
              ({item.exchanger.count_reviews})
            </p>
          </div>
          <div className={style.Fillters__categories__body__content__status}>
            <p
              className={
                style.Fillters__categories__body__content__status__header
              }
            >
              {item.exchanger.status.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
