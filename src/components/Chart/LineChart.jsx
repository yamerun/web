import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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

export const LineChart = () => {
  const { currentTo, currentFrom, statistics } = useSelector((state) => ({
    currentTo: state.itemsSlice.currentTo,
    currentFrom: state.itemsSlice.currentFrom,
    statistics: state.itemsSlice.statistics,
  }));

  const labels = statistics.map((item) => item.created_at);
  const data = labels.map((_, index) => ({
    in: statistics[index].in,
    out: statistics[index].out,
  }));

  const datasets = [
    {
      data: [data.map((item) => item.out), data.map((item) => item.in)],
      fill: false,
      borderColor: `#CD5C5C`,
    },
  ];

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={{ labels: labels, datasets: datasets }} options={options} />
    </div>
  );
};

