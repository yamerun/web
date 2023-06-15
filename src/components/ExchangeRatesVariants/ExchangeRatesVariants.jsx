import React, { useState, useEffect } from "react";
import { LineChartStatistics } from "../LineChartStatistics/LineChartStatistics";
import { useSelector } from "react-redux";
import style from "./ExchangeRates.module.scss";
import { AllExchangeRates } from "../AllExchangeRates/AllExchangeRates";

const FillteredExchangeRates = React.lazy(() =>
  import("../FillteredExchangeRatesContainer/FillteredExchange")
);
export default function ExchangeRatesVariants({ open }) {
  const {
    currentTo,
    currentFrom,
    isTwice,
    itemExchangeRates,
    isFilltersClear,
  } = useSelector((state) => ({
    currentTo: state.itemsSlice.currentTo,
    currentFrom: state.itemsSlice.currentFrom,
    isTwice: state.itemsSlice.isTwice,
    itemExchangeRates: state.itemsSlice.itemExchangeRates,
    isFilltersClear: state.itemsSlice.isFilltersClear,
  }));
  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

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

  React.useEffect(() => {
    const tableHeader = document.querySelectorAll(
      `.${style.courseBorder__headeritems}`
    );
    if (
      itemExchangeRates.length === 0 &&
      currentFrom != undefined &&
      currentTo != undefined
    ) {
      tableHeader[0].classList.add(`${style.hide}`);
    }
    if (itemExchangeRates.length !== 0 || isFilltersClear === true) {
      tableHeader[0].classList.remove(`${style.hide}`);
    }
  }, [itemExchangeRates, isFilltersClear, currentFrom, currentTo]);

  return (
    <div className={style.courseBorder__wrapper}>
      <table className={style.courseBorder}>
        {open != false ? (
          <LineChartStatistics />
        ) : (
          <>
            {isTwice != false ? (
              <thead>
                <tr className={style.courseBorder__headeritems}>
                  <th>Схема обмена</th>
                  <th>Резерв</th>
                  <th>Курс ↑</th>
                </tr>
              </thead>
            ) : (
              <thead>
                <tr className={style.courseBorder__headeritems}>
                  <th>Обменник</th>
                  <th>Отдаете ↑</th>
                  <th>Получаете ↓</th>
                  <th>Резерв</th>
                  <th>Отзывы</th>
                  <th>Статус</th>
                </tr>
              </thead>
            )}
            <>
              {currentFrom && currentTo != "" ? (
                <React.Suspense
                  fallback={
                    <h1
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: "15px",
                      }}
                    >
                      ...Loading
                    </h1>
                  }
                >
                  <FillteredExchangeRates />
                </React.Suspense>
              ) : (
                <AllExchangeRates />
              )}
            </>
          </>
        )}
      </table>
    </div>
  );
}

//  <th>Метки</th>
