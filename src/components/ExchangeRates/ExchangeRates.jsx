import React, { useState, useEffect } from "react";
import { LineChartStatistics } from "../LineChartStatistics/LineChartStatistics";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./ExchangeRates.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { FillteredExchangeRates } from "../FillteredExchangeRates/FillteredExchange";
import { AllExchangeRates } from "../AllExchangeRates/AllExchangeRates";
export const ExchangeRates = ({open}) => {
  const [all, setAll] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemExchangeRates,currentTo, currentFrom, } = useSelector((state) => ({
    itemExchangeRates: state.itemsSlice.itemExchangeRates,
    currentTo:state.itemsSlice.currentTo,
    currentFrom:state.itemsSlice.currentFrom
  }));


  return open != false ? (
    <LineChartStatistics />
  ) : (
    <div>
      <div className={style.Fillters__categories}>
        <h1 className={style.Fillters__categories__exchange}>Обменник ↑↓</h1>
        <h1 className={style.Fillters__categories__from}>Отдаете ↑</h1>
        <h1 className={style.Fillters__categories__to}>Получаете ↓</h1>
        <h1 className={style.Fillters__categories__reserve}>Резерв</h1>
        <h1 className={style.Fillters__categories__comment}>Отзывы</h1>
        <h1 className={style.Fillters__categories__status}>Статус</h1>
      </div>
      <div className={style.Fillters__categories__body}>
        {currentFrom && currentTo != '' ? (
          <FillteredExchangeRates />
        ) : (
          <AllExchangeRates />
        )}
      </div>
    </div>
  );
};
