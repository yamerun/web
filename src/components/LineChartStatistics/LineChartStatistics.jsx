import React, { useState, useEffect } from "react";
import style from "./LineStatistics.module.scss";
import { LineChart } from "../Chart/LineChart";
import { StatisticsControll } from "../Statistics/StatisticsControll";
import { useSelector } from "react-redux";
import axios from "axios";
export const LineChartStatistics = () => {
  const [currentHour, setCurrentHour] = useState("");
  const [active, setActive] = useState(false);
  const [statPoints, setStatPoints] = useState([]);
  const { currentFrom, currentTo } = useSelector((state) => ({
    currentFrom: state.itemsSlice.currentFrom,
    currentTo: state.itemsSlice.currentTo,
  }));

  const setPerHour = (e) => {
    setCurrentHour(e.target.textContent);
  };

  const openMenu = () => {
    setActive(!active);
  };

  const getStatByPerHour = () => {
    axios
      .get(
        `http://146.59.87.222/api/rate_statistics/best_rate?from=${currentFrom}&to=${currentTo}&perHour=${currentHour}`
      )
      .then(function (response) {
        setStatPoints(response.data.data);
      });
  };

  console.log(statPoints);

  return (
    <div className={style.statistics}>
      <StatisticsControll
        funcGetStat={getStatByPerHour}
        openMenu={openMenu}
        funcGetCurHour={setPerHour}
        active={active}
        currentHour={currentHour}
      />
      {statPoints.length !== 0 && <LineChart props={statPoints} />}
    </div>
  );
};
