import React, { useState, useEffect } from "react";
import style from "./LineStatistics.module.scss";
import { LineChart } from "../Chart/LineChart";
import { StatisticsControll } from "../Statistics/StatisticsControll";
import { useSelector } from "react-redux";
import axios from "axios";
import { setStatistic } from "../../store/itemsSlice/itemsSlice";
import { useDispatch } from "react-redux";
export const LineChartStatistics = () => {
  const [currentHour, setCurrentHour] = useState(1);
  const [active, setActive] = useState(false);
  const [statPoints, setStatPoints] = useState([]);
  const { currentFrom, currentTo, stat } = useSelector((state) => ({
    currentFrom: state.itemsSlice.currentFrom,
    currentTo: state.itemsSlice.currentTo,
    stat: state.itemsSlice.stat,
  }));
  const dispatch = useDispatch();

  const setPerHour = (e) => {
    setCurrentHour(e.target.textContent);
  };

  const openMenu = () => {
    setActive(!active);
  };

  const getStatByPerHour = () => {
    axios
      .get(
        `https://change.pro/api/rate_statistics/best_rate?from=${currentFrom}&to=${currentTo}&perHour=${currentHour}`
      )
      .then(function (response) {
        dispatch(setStatistic(response.data.data));
      });
  };
  console.log(stat);

  return (
    <div className={style.statistics}>
      <StatisticsControll
        funcGetStat={getStatByPerHour}
        openMenu={openMenu}
        funcGetCurHour={setPerHour}
        active={active}
        currentHour={currentHour}
      />
      <div className={style.statistics__plugBox}>
      {stat.length == 0 ? <p className={style.statistics__plugBox__plug}>Получить статистику по выбранному курсу валют </p> : <LineChart prop={stat} />}
        
      </div>
    </div>
  );
};
