import React, { useRef, useState, useEffect } from "react";
import style from "./Fillters.module.scss";
import { Calculator } from "../Calculator/Calculator";
import { Statistics } from "../Statistics/Statistics";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const [all, setAll] = useState([]);
  const { itemExchangeRates } = useSelector((state) => ({
    itemExchangeRates: state.itemsSlice.itemExchangeRates,
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
    axios
      .get(
        `http://146.59.87.222/api/exchangers/currencies/get?orderBy=amount&sort=asc`
      )
      .then(function (response) {
        setAll(response.data.data.slice(0, 7));
        console.log(response);
      });
    const getCurrenciesAll = setInterval(() => {
      axios
        .get(
          `http://146.59.87.222/api/exchangers/currencies/get?orderBy=amount&sort=asc`
        )
        .then(function (response) {
          setAll(response.data.data.slice(0, 7));
        });
    }, 5000);
    return () => clearInterval(getCurrenciesAll);
  }, []);

  const openItemSite = (url) => {
    window.open(`${url}`);
  };

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
                        {item.exchanger.status.title}
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
                        {item.exchanger.user_reviews}
                      </p>
                      <p
                        className={
                          style.Fillters__categories__body__content__comment__header
                        }
                        style={{
                          color: item.exchanger.count_reviews == 0 && "red",
                        }}
                      >
                        ({item.exchanger.count_reviews})
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
                        {item.exchanger.status.title}
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
