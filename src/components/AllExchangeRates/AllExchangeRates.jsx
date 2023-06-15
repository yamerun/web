import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./AllExchangeRates.module.scss";
import { useNavigate } from "react-router-dom";
import { Marks } from "../Marks/Marks";
export const AllExchangeRates = () => {
  const [all, setAll] = useState([]);
  const navigate = useNavigate();
  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  useEffect(() => {
    axios
      .get(
        `https://change.pro/api/exchangers/currencies/get?orderBy=amount&sort=asc`
      )
      .then(function (response) {
        setAll(response.data.data.slice(0, 16));
      });
    const getCurrenciesAll = setInterval(() => {
      axios
        .get(
          `https://change.pro/api/exchangers/currencies/get?orderBy=amount&sort=asc`
        )
        .then(function (response) {
          setAll(response.data.data.slice(0, 16));
        });
    }, 5000);
    return () => clearInterval(getCurrenciesAll);
  }, []);

  const openItemSite = (url) => {
    window.open(`${url}`);
  };
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", setDimension);
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const goToItemPage = ({ id }) => {
    navigate(`/ExchangerPage/${id}`);
  };

  return (
    <tbody className={style.table}>
      {all.map((item) => (
        <tr className={style.table__row}>
          <td className={style.table__row__box}>
            <div className={style.table__row__box__exchanger} >
              <button
                onClick={() => goToItemPage(item.exchanger)}
                className={style.table__row__box__exchangerinfo}
              />
              <p onClick={() => openItemSite(item.exchanger.site_url)}>
                {item.exchanger.name}
              </p>
            </div>
          </td>
          {item.marks.length != 0 && <Marks prop={item.marks} />}
          <td className={style.table__row__box}>
            <p>{(Math.round(item.in * 100) / 100).toFixed(2)}</p>
            <p className={style.table__row__box__smalltext}>{item.from}</p>
          </td>
          <td className={style.table__row__box}>
            <p
              className={style.Fillters__categories__body__content__to__header}
            >
              {(Math.round(item.out * 100) / 100).toFixed(2)}
            </p>
            <p className={style.table__row__box__smalltext}>{item.to}</p>
          </td>
          <td className={style.table__row__box}>
            <p>{(Math.round(item.amount * 100) / 100).toFixed(2)}</p>
          </td>
          <td className={style.table__row__box}>
            <p>{item.exchanger.user_reviews}</p>
            <p
              style={{
                color: item.exchanger.count_reviews == 0 && "red",
              }}
            >
              ({item.exchanger.count_reviews})
            </p>
          </td>
          <td className={style.table__row__box}>
            <p
              style={{
                color:
                  item.exchanger.status.title === "Работает"
                    ? "#00FF7F"
                    : "red",
              }}
            >
              {item.exchanger.status.title}
            </p>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
