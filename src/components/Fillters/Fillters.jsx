import React, { useRef, useState, useEffect } from "react";
import style from "./Fillters.module.scss";
import { Calculator } from "../Calculator/Calculator";
import { ClearAll } from "../ClearAllFillters/ClearAllFillters";
import { useSelector } from "react-redux";
import { ExchangeRates } from "../ExchangeRates/ExchangeRates";
import { TwiceExchange } from "../TwiceExchange/TwiceExchange";
export const Fillters = () => {
  const NavProps = [
    "Курсы обмена",
    "Калькулятор",
    "Оповещение",
    "Двойной обмен",
    "Статистика",
    "Настроить",
  ];
  const calc = useRef(null);
  const twiceChange = useRef(null);
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState([]);
  const { itemExchangeRates, currentFrom, currentTo, twiceExchanger } =
    useSelector((state) => ({
      itemExchangeRates: state.itemsSlice.itemExchangeRates,
      currentFrom: state.itemsSlice.currentFrom,
      currentTo: state.itemsSlice.currentTo,
      twiceExchanger: state.itemsSlice.twiceExchanger,
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
      calc.current.classList.add(`${style.Fillters__open}`);
    } else calc.current.classList.remove(`${style.Fillters__open}`);

    if (e.target.textContent == "Двойной обмен") {
      twiceChange.current.classList.add(`${style.Fillters__open}`);
    } else twiceChange.current.classList.remove(`${style.Fillters__open}`);

    if (e.target.textContent == "Статистика") {
      setOpen(true);
    } else setOpen(false);
  };

  return (
    <div className={style.Fillters}>
      <div
        className={currentFrom && currentTo !== "" ? style.show : style.hide}
      >
        <ClearAll />
      </div>
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
      <div ref={calc} className={style.Fillters__inActive}>
        <Calculator />
      </div>
      <div ref={twiceChange} className={style.Fillters__inActive}>
        <TwiceExchange />
      </div>
      <ExchangeRates open={open} />
    </div>
  );
};
