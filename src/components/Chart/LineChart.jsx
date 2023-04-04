import React, { useEffect, useState } from "react";
//import style from "./Chart.module.scss";
//import axios from "axios";
//import { useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
//import { setStatistics } from "../../store/itemsSlice/itemsSlice";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export const data = {

  datasets: [
    {
      label: "Dataset 1",
      data: { min: [123], max: [21312] },
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: { min: [123], max: [21312] },
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const LineChart = () => {
  return <Line options={options} data={data} />;
};
