import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import style from "./Chart.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setStatistics } from "../../store/itemsSlice/itemsSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export const Chart = () => {
  const { currentTo, currentFrom, statistics } = useSelector((state) => ({
    currentTo: state.itemsSlice.currentTo,
    currentFrom: state.itemsSlice.currentFrom,
    statistics: state.itemsSlice.statistics,
  }));
 const dispatch = useDispatch()
  const labels = [currentFrom, currentTo];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1,500],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={style.Chart}>
        <Line options={options} data={ data} />
    </div>
  );
};
