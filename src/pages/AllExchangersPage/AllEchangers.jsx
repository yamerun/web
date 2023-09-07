import React, { useRef, useEffect, useState } from "react";
import style from "./allExchange.module.scss";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Marks } from "../../components/Marks/Marks";

import { SearchMenu } from "../../components/SearchMenu/SearchMenu";

import validateInputValueForSearch from "./js/searchValidatorhelper";
export const exchangersLoader = async () => {
	const res = await fetch(
		`https://change.pro/api/exchangers/currencies/get?orderBy=exchanger_name&sort=asc`
	);
	const item = await res.json();
	return { item };
};

export const AllEchangers = () => {
	const { item } = useLoaderData();
	const [result, setResultExchangers] = useState([]);
	const [inputVal, setInputVal] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [selected, setSelected] = useState([]);
	const ref = useRef(null);

	const changeValueForSearch = (e) => {
		const newVal = validateInputValueForSearch(e.target.value);
		setInputVal(newVal);
	};

	useEffect(() => {
		if (inputVal.length < 2) {
			setResultExchangers(item.data);
			const getCurrenciesAll = setInterval(() => {
				axios
					.get(
						`https://change.pro/api/exchangers/currencies/get?orderBy=amount&sort=asc`
					)
					.then(function (response) {
						setResultExchangers(response.data.data);
					});
			}, 5000);
			return () => clearInterval(getCurrenciesAll);
		}
	}, [item, inputVal]);

	useEffect(() => {
		if (inputVal.length > 1) {
			axios
				.get(
					`https://change.pro/api/exchangers/currencies/get?orderBy=amount&sort=asc&exchanger_name=${inputVal}&limit=50`
				)
				.then(function (response) {
					setResultExchangers(response.data.data);
				})
				.catch(function (error) { });
		}

		const get = setInterval(() => {
			if (inputVal.length > 1) {
				axios
					.get(
						`https://change.pro/api/exchangers/currencies/get?orderBy=amount&sort=asc&exchanger_name=${inputVal}&limit=50`
					)
					.then(function (response) {
						setResultExchangers(response.data.data);
					})
					.then(function (response) { })
					.catch(function (error) { });
			}
		}, 3000);

		return () => clearInterval(get);
	}, [inputVal]);

	const setFrom = (e) => {
		setSelected(e.target.textContent);
	};

	useEffect(() => {
		if (selected.length != 0 && ref.current != null) {
			ref.current.classList.add(`${style.hide}`);
		}
	}, [selected]);

	return (
		<div className={'section-wrapper'}>
			<div className={'container-full'}>
				<div className="row">
					<SearchMenu />
					<main className={style.Exchangers + ' col-lg-9 col-md-8 col-12'}>
						<div className="block">
							<div className={style.Exchangers__content__body}>
								<div className={style.Exchangers__content__body__seacrh}>
									<div className={style.Exchangers__content__body__seacrh__fields}>
										<div className={style.Exchangers__content__body__seacrh__input}>
											<div
												className={
													style.Exchangers__content__body__seacrh__input__controlls
												}
											>
												<input
													onChange={(e) => changeValueForSearch(e)}
													className={
														style.Exchangers__content__body__seacrh__input__field
													}
													placeholder="Название обменника"
													name="currencyFrom"
												/>
												<button
													className={
														style.Exchangers__content__body__seacrh__input__btn
													}
												/>
											</div>
											{inputVal.length != 0 && searchResult.length != 0 && (
												<div
													ref={ref}
													className={
														style.Exchangers__content__body__seacrh__input__results
													}
												>
													{searchResult.map((item) => (
														<h1 onClick={(e) => setFrom(e)}>{item.currency}</h1>
													))}
												</div>
											)}
										</div>
									</div>
								</div>
								<table className={style.Exchangers__content__table}>
									<thead>
										<tr className={style.Exchangers__content__table__navrow}>
											<th>
												<p>Обменники</p>
											</th>
											<th>
												<p>Резерв</p>
											</th>
											<th>
												<p>Кол-во курсов</p>
											</th>
											<th>
												<p>Отзывы</p>
											</th>
											<th></th>
										</tr>
									</thead>
									<tbody className={style.table}>
										{result.map((item) => (
											<tr className={style.table__row}>
												<td className={style.table__row__box}>
													<div className={style.table__row__exchanger}>
														<Link
															to={`/exchanger/${item.id}`}
															className={style.table__row__box__link}
														/>
														<p>{item.exchanger.name}</p>
													</div>
												</td>
												<td className={style.table__row__box}>
													<p>{(Math.round(item.amount * 100) / 100).toFixed(2)}</p>
												</td>
												<td className={style.table__row__box}>
													<p>{item.number_rates ? `${item.number_rates}` : 0}</p>
												</td>
												<td className={style.table__row__box}>
													<p>
														{item.exchanger.user_reviews}/{item.exchanger.count_reviews}
													</p>
												</td>
												<td className={style.table__row__box}>
													<Link
														to={`/exchanger/${item.id}`}
													>Подробнее</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};
