import React, { useEffect, useState, useRef } from "react";
import style from "./Calculator.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
	setCurrentItemFromReducer,
	setisTwice,
	setCurrentItemToReducer,
	setCalculated,
	setStatistic,
	setIsFilltersClear
} from "../../store/itemsSlice/itemsSlice";

export const Calculator = () => {
	const dispatch = useDispatch();
	const { calculated, currentTo, currentFrom } = useSelector((state) => ({
		calculated: state.itemsSlice.calculated,
		currentTo: state.itemsSlice.currentTo,
		currentFrom: state.itemsSlice.currentFrom,
	}));
	const [val, setVal] = useState("");
	const [val2, setVal2] = useState("");
	const inputGive = useRef(null);
	const inputGet = useRef(null);

	const setCalculetedAmountGive = (e) => {
		setVal(e.target.value);

		if (inputGive.current.value.length !== 0) {
			setVal(e.target.value);
			inputGet.current.disabled = true;
		} else inputGet.current.disabled = false;
	};

	const setCalculetedAmountGet = (e) => {
		if (inputGet.current.value.length !== 0) {
			setVal2(e.target.value);
			inputGive.current.disabled = true;
		} else inputGive.current.disabled = false;
	};

	const getCalculatedValue = () => {
		if (inputGet.current.value.length !== 0) {
			axios
				.get(
					`https://change.pro/api/calc?quantity=${val2}&from=${currentFrom}&to=${currentTo}&is_give=false&is_commission=false`
				)
				.then(function (response) {
					dispatch(setitemExchangeRatesReducer(response.data.data));
					dispatch(setCalculated(true));
					dispatch(setisTwice(false));
				})
				.then(function (response) { })
				.catch(function (error) { });
		}

		if (inputGive.current.value.length !== 0) {
			axios
				.get(
					`https://change.pro/api/calc?quantity=${val}&from=${currentFrom}&to=${currentTo}&is_give=true&is_commission=false`
				)
				.then(function (response) {
					dispatch(setitemExchangeRatesReducer(response.data.data));
					dispatch(setCalculated(true));
					console.log(response.data.data)
					dispatch(setisTwice(false));
				})
				.then(function (response) { })
				.catch(function (error) { });
		}
	};
	const clearCalculate = () => {
		dispatch(setCalculated(false));
	};

	const clearAllFillters = () => {
		dispatch(setCurrentItemFromReducer(''));
		dispatch(setCurrentItemToReducer(''));
		dispatch(setCalculated(false));
		dispatch(setisTwice(false));
		dispatch(setStatistic([]));
		dispatch(setIsFilltersClear(true));

		console.log('clearAllFillters');

		document.getElementById('SearchMenuFrom').value = '';
		document.getElementById('SearchMenuTo').value = '';

		let newUrl = new URL('changePro/', window.location.protocol + '//' + window.location.host);
		history.pushState({}, '', newUrl);
	};

	return (
		<div className={style.Calculator + ' ' + style.FormFilter + ' row'}>
			<div className="col-lg-2"></div>
			<div className="col-lg-3 col-6">
				<label className={style.FormFilter__item + ' ' + style.left} htmlFor="">
					<span className={style.FormFilter__label__text}>Oтдаете
						<span className={style.FormFilter__label__current}>{currentFrom}</span>
					</span>
					<input
						className={style.FormFilter__item__input}
						onChange={(e) => setCalculetedAmountGive(e)}
						type="numeric"
						min="0"
						ref={inputGive}
					/>
				</label>
			</div>
			<div className="col-lg-3 col-6">
				<label className={style.FormFilter__item + ' ' + style.right} htmlFor="">
					<span className={style.FormFilter__label__text}>Получаете
						<span className={style.FormFilter__label__current}>{currentTo}</span>
					</span>
					<input
						className={style.FormFilter__item__input}
						onChange={(e) => setCalculetedAmountGet(e)}
						ref={inputGet}
					/>
				</label>
			</div>
			<div className={style.FormFilter__wrapper + ' col-lg-2'}>
				<label className={style.FormFilter__item + ' d-flex p-unbottom'} htmlFor="nocommission">
					<input
						id="nocommission"
						className={style.FormFilter__item__checkbox}
						type="checkbox"
					/>
					<span></span>
					<span className={style.FormFilter__label__text}>Без комиссий ПС</span>
				</label>
				<div className={style.FormFilter__item}>
					<button
						className={style.FormFilter__item__btn}
						onClick={getCalculatedValue}
					>
						Рассчитать
					</button>
				</div>
			</div>
			<div className="col-lg-2">
				<div className={style.FormFilter__item + ' d-flex f-end'}>
					<button
						onClick={clearAllFillters}
						className={style.FormFilter__item__btn + ' ' + style.FormFilter__item__btn__alt}
					>
						Очистить фильтры
					</button>
				</div>
			</div>
		</div>
	);
};
