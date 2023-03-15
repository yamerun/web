import React, { useRef, useState, useEffect, useMemo } from "react";
import style from "./Fillters.module.scss";
import { Calculator } from "../Calculator/Calculator";
import { Statistics } from "../Statistics/Statistics";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setitemexchangeReducer } from "../../store/itemsSlice/itemsSlice";

export const Fillters = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const NavProps = [
    "Курсы обмена",
    "Калькулятор",
    "Оповещение",
    "Двойной обмен",
    "Статистика",
    "Настроить",
  ];
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [exchageId, setExchangeId] = useState("");
  const [exchageIdAll, setExchangeIdAll] = useState("");
  const [exchangeAll, setExchangeAll] = useState([]);

  const [all, setAll] = useState([]);
  const { itemExchangeRates, exchange } = useSelector((state) => ({
    itemExchangeRates: state.itemsSlice.itemExchangeRates,
    exchange: state.itemsSlice.exchange,
  }));

  const handleSelect = (e) => {
    const btnElements = document.querySelectorAll(
      `.${style.Fillters__navigation__item}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
    if (e.target.textContent == "Калькулятор") {
      ref.current.classList.add(`${style.Fillters__open}`);
    } else ref.current.classList.remove(`${style.Fillters__open}`);
    if (e.target.textContent == "Статистика") {
      setOpen(true);
    } else setOpen(false);
  };

  useEffect(() => {
    itemExchangeRates.map((item) => setExchangeId(item.exchanger_id));
    axios
      .get(`http://146.59.87.222/api/exchangers/get?exchanger_id=${exchageId}`)
      .then(function (response) {
        dispatch(setitemexchangeReducer(response.data.data));
        console.log(response.data.data);
      })
      .catch(function (error) { });
  }, [exchageId, itemExchangeRates]);

  useEffect(() => {
    all.map((item) => setExchangeIdAll(item.exchanger_id));
    axios
      .get(
        `http://146.59.87.222/api/exchangers/currencies/get?orderBy=amount&sort=asc`
      )
      .then(function (response) {
        setAll(response.data.data.slice(0, 7));
      });
    axios
      .get(
        `http://146.59.87.222/api/exchangers/get?exchanger_id=${exchageIdAll}`
      )
      .then(function (response) {
        setExchangeAll(response.data.data);
      })
      .catch(function (error) { });
  }, [exchageIdAll, all]);

  const goToItemPage = () => {
    navigate("/exchangePage");
  };

  const goToExchange = () => {
    window.open(exchange.site_url);
  };
  const goToExchange2 = () => {
    window.open(exchangeAll.site_url);
  };

  const goToItemPagefromEchageAll = () => {
    navigate("/exchangePage");
    dispatch(setitemexchangeReducer(exchangeAll));
  };

  console.log(all);

  return (
    <div className={style.Fillters}>
      <nav className={style.Fillters__navigation}>
        <ul className={style.Fillters__navigation__items}>
          {NavProps.map((item) => (
            <li
              className={style.Fillters__navigation__item}
              onClick={(e) => handleSelect(e)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <div ref={ref} className={style.Fillters__inActive}>
        <Calculator />
      </div>
      {open != false ? (
        <Statistics />
      ) : (
        <div>
          <div className={style.Fillters__categories}>
            <h1 className={style.Fillters__categories__exchange}>
              Обменник ↑↓
            </h1>
            <h1 className={style.Fillters__categories__from}>Отдаете ↑</h1>
            <h1 className={style.Fillters__categories__to}>Получаете ↓</h1>
            <h1 className={style.Fillters__categories__reserve}>Резерв</h1>
            <h1 className={style.Fillters__categories__comment}>Отзывы</h1>
            <h1 className={style.Fillters__categories__status}>Статус</h1>
          </div>

          <div className={style.Fillters__categories__body}>
            {itemExchangeRates.length != 0
              ? itemExchangeRates.map((item) => (
                <div className={style.Fillters__categories__body__content}>
                  <div
                    className={
                      style.Fillters__categories__body__content__excahange
                    }
                  >
                    <button
                      onClick={() => goToItemPage()}
                      className={
                        style.Fillters__categories__body__content__excahange__btn
                      }
                    />
                    <p
                      onClick={goToExchange}
                      className={
                        style.Fillters__categories__body__content__excahange__header
                      }
                    >
                      {exchange.name}
                    </p>
                  </div>
                  <div
                    className={
                      style.Fillters__categories__body__content__from
                    }
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__from__header
                      }
                    >
                      1
                    </p>
                    <p
                      className={
                        style.Fillters__categories__body__content__from__header2
                      }
                    >
                      {item.from}
                    </p>
                  </div>
                  <div
                    className={style.Fillters__categories__body__content__to}
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__to__header
                      }
                    >
                      {(Math.round(item.out * 100) / 100).toFixed(2)}
                    </p>
                    <p
                      className={
                        style.Fillters__categories__body__content__to__header2
                      }
                    >
                      {item.to}
                    </p>
                  </div>
                  <div
                    className={
                      style.Fillters__categories__body__content__reserve
                    }
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__reserve__header
                      }
                    >
                      {(Math.round(item.amount * 100) / 100).toFixed(2)}
                    </p>
                  </div>
                  <div
                    className={
                      style.Fillters__categories__body__content__comment
                    }
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__comment__header
                      }
                    >
                      0/5082
                    </p>
                  </div>
                  <div
                    className={
                      style.Fillters__categories__body__content__status
                    }
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__status__header
                      }
                    >
                      {exchange.status}
                    </p>
                  </div>
                </div>
              ))
              : all.map((item) => (
                <div className={style.Fillters__categories__body__content}>
                  <div
                    className={
                      style.Fillters__categories__body__content__excahange
                    }
                  >
                    <button
                      onClick={() => goToItemPagefromEchageAll()}
                      className={
                        style.Fillters__categories__body__content__excahange__btn
                      }
                    />
                    <p
                      onClick={goToExchange2}
                      className={
                        style.Fillters__categories__body__content__excahange__header
                      }
                    >
                      {exchangeAll.name}
                    </p>
                  </div>
                  <div
                    className={
                      style.Fillters__categories__body__content__from
                    }
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__from__header
                      }
                    >
                      1
                    </p>
                    <p
                      className={
                        style.Fillters__categories__body__content__from__header2
                      }
                    >
                      {item.from}
                    </p>
                  </div>
                  <div
                    className={style.Fillters__categories__body__content__to}
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__to__header
                      }
                    >
                      {(Math.round(item.out * 100) / 100).toFixed(2)}
                    </p>
                    <p
                      className={
                        style.Fillters__categories__body__content__to__header2
                      }
                    >
                      {item.to}
                    </p>
                  </div>
                  <div
                    className={
                      style.Fillters__categories__body__content__reserve
                    }
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__reserve__header
                      }
                    >
                      {(Math.round(item.amount * 100) / 100).toFixed(2)}
                    </p>
                  </div>
                  <div
                    className={
                      style.Fillters__categories__body__content__comment
                    }
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__comment__header
                      }
                    >
                      0/5082
                    </p>
                  </div>
                  <div
                    className={
                      style.Fillters__categories__body__content__status
                    }
                  >
                    <p
                      className={
                        style.Fillters__categories__body__content__status__header
                      }
                    >
                      {exchangeAll.status}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
