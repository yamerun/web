import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./AllExchangeRates.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Marks } from "../Marks/Marks";
import img from "../../assets/imgs/green-circle.svg";
import img1 from "../../assets/imgs/red-circle.svg";

export const AllExchangeRates = () => {
	const [all, setAll] = useState([]);
	const navigate = useNavigate();
	const [screenSize, getDimension] = React.useState({
		dynamicWidth: window.innerWidth,
		dynamicHeight: window.innerHeight,
	});
	useEffect(() => {
		axios
			.get(
				`https://change.pro/api/exchangers/currencies/get?orderBy=amount&sort=asc`
			)
			.then(function (response) {
				setAll(response.data.data.slice(0, 16));
			});
		const getCurrenciesAll = setInterval(() => {
			axios
				.get(
					`https://change.pro/api/exchangers/currencies/get?orderBy=amount&sort=asc`
				)
				.then(function (response) {
					setAll(response.data.data.slice(0, 16));
				});
		}, 5000);
		return () => clearInterval(getCurrenciesAll);
	}, []);

	const openItemSite = (url) => {
		window.open(`${url}`);
	};
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

	const goToItemPage = ({ id }) => {
		navigate(`/exchanger/${id}`);
	};

	const goToItemPageLink = ({ id }) => {
		return `/exchanger/${id}`;
	};

	return (
		<tbody className={style.table}>
			{all.map((item) => (
				<tr className={style.table__row} key={item.id}>
					{/** Обменник */}
					<td className={style.table__row__box}>
						<div className={style.table__row__box__exchanger}>
							<p onClick={() => openItemSite(item.exchanger.site_url)}>
								{item.exchanger.name}
							</p>
						</div>
					</td>

					{/** Метки */}

					<td className={style.table__row__box}>
						<div className={style.marksBox}>
							{item.marks.length != 0
								? item.marks.map((item) => <Marks prop={item} />)
								: "✖"}
						</div>
					</td>

					{/** Отдаёте */}
					<td className={style.table__row__box}>
						<div className={style.table__row__flexbox}>
							<p>{(Math.round(item.in * 100) / 100).toFixed(2)} </p>
							<p className={style.table__row__box__smalltext}>{item.from}</p>
						</div>
					</td>

					{/** Получаете */}
					<td className={style.table__row__box}>
						<div className={style.table__row__flexbox}>
							<p>{(Math.round(item.out * 100) / 100).toFixed(2)}</p>
							<p className={style.table__row__box__smalltext}>{item.to}</p>
						</div>
					</td>

					{/** Резерв */}
					<td className={style.table__row__box}>
						<p>{(Math.round(item.amount * 100) / 100).toFixed(2)}</p>
					</td>

					{/** Обменять */}
					<td className={style.table__row__box}>
						<Link
							to={goToItemPageLink(item.exchanger)}
						>Get Cashback</Link>
					</td>

					{/** Инфо */}
					<td className={style.table__row__box}>
						<Link
							to={goToItemPageLink(item.exchanger)}
							className={style.table__row__flexbox}
						>
							<div className={style.table__row__box__exchangerinfo}></div>
							{item.exchanger.user_reviews} ({item.exchanger.count_reviews})
						</Link>
					</td>
				</tr>
			))}
		</tbody>
	);
};
