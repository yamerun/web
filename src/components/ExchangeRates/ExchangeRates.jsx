import React, { useState, useEffect } from "react";
import { LineChartStatistics } from "../LineChartStatistics/LineChartStatistics";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./ExchangeRates.module.scss";
//import { FillteredExchangeRates } from "../FillteredExchangeRates/FillteredExchange";
import { AllExchangeRates } from "../AllExchangeRates/AllExchangeRates";

const FillteredExchangeRates = React.lazy(() =>
  import("../FillteredExchangeRates/FillteredExchange")
);
export default function ExchangeRates({ open }) {
  const [all, setAll] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentTo, currentFrom, isTwice } = useSelector((state) => ({
    currentTo: state.itemsSlice.currentTo,
    currentFrom: state.itemsSlice.currentFrom,

    isTwice: state.itemsSlice.isTwice,
  }));

  return (
    <div>
      {open != false ? (
        <LineChartStatistics />
      ) : (
        <div>
          {isTwice != false ? (
            <div className={style.Fillters__categoriesTwice}>
              <h1 className={style.Fillters__categoriesTwice__schema}>
                Схема обмена
              </h1>
              <div className={style.Fillters__categoriesTwice__categoryBox}>
                <h1 className={style.Fillters__categoriesTwice__reserve}>
                  Резерв
                </h1>
                <h1 className={style.Fillters__categoriesTwice__course}>
                  Курс ↑
                </h1>
              </div>
            </div>
          ) : (
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
          )}
          <div className={style.Fillters__categories__body}>
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
          </div>
        </div>
      )}
    </div>
  );
}
