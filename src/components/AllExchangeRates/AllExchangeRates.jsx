import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./AllExchangeRates.module.scss";
import { Link } from "react-router-dom";
import { Marks } from "../Marks/Marks";
import { useSelector } from "react-redux";
export const AllExchangeRates = () => {
  const [all, setAll] = useState([]);
  const { tooltip } = useSelector((state) => ({
    tooltip: state.itemsSlice.tooltip,
  }));
  useEffect(() => {
    axios
      .get(
        `http://146.59.87.222/api/exchangers/currencies/get?orderBy=amount&sort=asc`
      )
      .then(function (response) {
        setAll(response.data.data.slice(0, 20));
      });
    const getCurrenciesAll = setInterval(() => {
      axios
        .get(
          `http://146.59.87.222/api/exchangers/currencies/get?orderBy=amount&sort=asc`
        )
        .then(function (response) {
          setAll(response.data.data.slice(0, 20));
        });
    }, 5000);
    return () => clearInterval(getCurrenciesAll);
  }, []);

  const openItemSite = (url) => {
    window.open(`${url}`);
  };

  return all.map((item) => (
    <div className={style.Fillters__categories__body__content}>
      <div className={style.Fillters__categories__body__content__excahange}>
        <Link
          to={`/${item.exchanger.id}`}
          className={style.Fillters__categories__body__content__excahange__btn}
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
      {item.marks.length != 0 && <Marks prop={item.marks} />}
      <div className={style.Fillters__categories__body__content__from}>
        <p className={style.Fillters__categories__body__content__from__header}>
          1
        </p>
        <p className={style.Fillters__categories__body__content__from__header2}>
          {item.from}
        </p>
      </div>
      <div className={style.Fillters__categories__body__content__to}>
        <p className={style.Fillters__categories__body__content__to__header}>
          {(Math.round(item.out * 100) / 100).toFixed(2)}
        </p>
        <p className={style.Fillters__categories__body__content__to__header2}>
          {item.to}
        </p>
      </div>
      <div className={style.Fillters__categories__body__content__reserve}>
        <p
          className={style.Fillters__categories__body__content__reserve__header}
        >
          {(Math.round(item.amount * 100) / 100).toFixed(2)}
        </p>
      </div>
      <div className={style.Fillters__categories__body__content__comment}>
        <p
          className={style.Fillters__categories__body__content__comment__header}
        >
          {item.exchanger.user_reviews}
        </p>
        <p
          className={style.Fillters__categories__body__content__comment__header}
          style={{
            color: item.exchanger.count_reviews == 0 && "red",
          }}
        >
          ({item.exchanger.count_reviews})
        </p>
      </div>
      <div className={style.Fillters__categories__body__content__status}>
        <p
          className={style.Fillters__categories__body__content__status__header}
        >
          {item.exchanger.status.title}
        </p>
      </div>
    </div>
  ));
};
