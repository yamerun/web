import React, { useRef, useState, useEffect, lazy, Suspense } from "react";
import style from "./Fillters.module.scss";
import { Calculator } from "../Calculator/Calculator";
import { ClearAll } from "../ClearAllFillters/ClearAllFillters";
import { useSelector } from "react-redux";
import { TwiceExchange } from "../TwiceExchangePanel/TwiceExchangePanel";
import { useDispatch } from "react-redux";
import { setisTwice } from "../../store/itemsSlice/itemsSlice";
import { Notflications } from "../Notflications/Notflications";

const ExchangeRates = React.lazy(() =>
  import("../ExchangeRatesVariants/ExchangeRatesVariants")
);

export const Fillters = () => {
  const NavProps = [
    "Курсы обмена",
    "Калькулятор",
    "Оповещение",
    "Двойной обмен",
    "Статистика",
  ];
  const calc = useRef(null);
  const twiceChange = useRef(null);
  const notflications = useRef(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentFrom, currentTo, isFilltersClear } = useSelector((state) => ({
    itemExchangeRates: state.itemsSlice.itemExchangeRates,
    currentFrom: state.itemsSlice.currentFrom,
    currentTo: state.itemsSlice.currentTo,
    twiceExchanger: state.itemsSlice.twiceExchanger,
    isFilltersClear: state.itemsSlice.isFilltersClear,
  }));

  const handleSelect = (e) => {
    const btnElements = document.querySelectorAll(
      `.${style.Fillters__navigation__item}`
    );
    e.target.classList.add(style.active);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(style.active);
      }
    }
    if (e.target.textContent == "Калькулятор") {
      calc.current.classList.add(style.Fillters__open);
    } else calc.current.classList.remove(style.Fillters__open);
    if (e.target.textContent == "Двойной обмен") {
      twiceChange.current.classList.add(style.Fillters__open);
    } else twiceChange.current.classList.remove(style.Fillters__open);
    if (e.target.textContent == "Оповещение") {
      notflications.current.classList.add(style.Fillters__open);
    } else notflications.current.classList.remove(style.Fillters__open);
    if (e.target.textContent == "Статистика") {
      setOpen(true);
    } else setOpen(false);
    if (e.target.textContent == "Двойной обмен") {
      dispatch(setisTwice(true));
    } else {
      dispatch(setisTwice(false));
    }
  };

  useEffect(() => {
    if (isFilltersClear === true) {
      const btnElements = document.querySelectorAll(
        `.${style.Fillters__navigation__item}`
      );
      for (let i of btnElements) {
        i.classList.remove(style.active);
      }
    }
  }, [isFilltersClear]);

  return (
    <>
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
      <div className={style.Fillters}>
        <div
          className={currentFrom && currentTo !== "" ? style.show : style.hide}
        >
          <ClearAll />
        </div>
        <div ref={calc} className={style.Fillters__inActive}>
          <Calculator />
        </div>
        <div ref={notflications} className={style.Fillters__inActive}>
          <Notflications />
        </div>
        <div ref={twiceChange} className={style.Fillters__inActive}>
          <TwiceExchange />
        </div>
        <React.Suspense
          fallback={
            <h1
              style={{ color: "white", textAlign: "center", fontSize: "15px" }}
            >
              ...Loading
            </h1>
          }
        >
          {" "}
          <ExchangeRates open={open} />
        </React.Suspense>
      </div>
    </>
  );
};
