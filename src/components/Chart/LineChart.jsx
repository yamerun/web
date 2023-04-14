import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import style from "./Chart.module.scss";

export const LineChart = ({ props }) => {
  const width = 600;
  const height = 300;
  const data = props.values.map((item) => item.value);
  // const labels = [5, 8, 12, 6, 10, 15]
  const labels = props.values.map((item) => item.datetime.time);
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const yScale = (maxValue - minValue) / height;

  // Новый код для расчета координат точек
  const xValues = labels.map((label, i) => (i * width) / (labels.length - 1));
  const yValues = data.map((y) => height - (y - minValue) / yScale);

  // Создаем массив строк в формате "x координата,y координата"
  const coordinates = xValues
    .map((x, i) => `${x},${yValues[i].toFixed(2)}`)
    .join(" ");

  // Размер отображаемого диапазона лейблов
  const displayRange = 10;
  const [startIndex, setStartIndex] = useState(0);

  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const scrollRight = () => {
    if (startIndex < labels.length - displayRange) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const labelElements = labels
    .slice(startIndex, startIndex + displayRange)
    .map((label, i) => {
      const x = ((i + startIndex) * width) / (labels.length - 1);
      const isActive = i + startIndex === labels.length - 1;
      return (
        <div
          key={i}
          className={`${style.label} ${isActive ? style.active : ""}`}
        >
          {label}
        </div>
      );
    });

  const leftArrowClasses = `${style.arrow} ${
    startIndex > 0 ? style.active : ""
  }`;
  const rightArrowClasses = `${style.arrow} ${
    startIndex < labels.length - displayRange ? style.active : ""
  }`;

  return (
    <div className={style.chart}>
      <svg width={width} height={height}>
        <polyline
          points={coordinates}
          stroke="white"
          strokeWidth={2}
          fill="none"
        />
      </svg>
      <div className={style.labelContainer}>
        <div
          onClick={scrollLeft}
          className={`${leftArrowClasses} ${style.left}`}
        >
          &#10094;
        </div>
        <div className={style.labels}>{labelElements}</div>
        <div
          onClick={scrollRight}
          className={`${rightArrowClasses} ${style.right}`}
        >
          &#10095;
        </div>
      </div>
    </div>
  );
};
