import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import style from "./Chart.module.scss";
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
import { Colors } from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Colors
);

export const options = {
	responsive: true,
	elements: {

	},
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			// display: true,
			text: "Chart.js Line Chart",
		},
	},
	scales: {
		y: {
			ticks: {
				beginAtZero: true,
				min: 132123,
				max: 13123,
			}
		}
	}
};

export const LineChart = ({ }) => {
	const { currentTo, currentFrom, stat } = useSelector((state) => ({
		currentTo: state.itemsSlice.currentTo,
		currentFrom: state.itemsSlice.currentFrom,
		stat: state.itemsSlice.stat,
	}));
	const [screenSize, getDimension] = React.useState({
		dynamicWidth: window.innerWidth,
		dynamicHeight: window.innerHeight,
	});

	const labels = stat.values.map((item) => item.datetime.time);

	const datasets = [
		{
			label: `${currentFrom} - ${currentTo}`,
			data: stat.values.map((item) => item.value),
			fill: true,
			borderColor: "#77D22D",

		},
	];

	const labelsplug = [1, 2, 3, 4, 5, 6, 7, 8,]

	const datasetsplug = [
		{
			label: [1],
			data: stat.values.map((item) => item.value),
			fill: true,
			borderColor: "#77D22D",

		},
	];


	return (
		<>
			{stat.length !== 0 && (
				<Line
					data={{ labels: labels, datasets: datasets }}
					options={options}
					className={style.Chart}
					width={"600px"}
					height={"400px"}
				/>
			)}

		</>
	);
};
