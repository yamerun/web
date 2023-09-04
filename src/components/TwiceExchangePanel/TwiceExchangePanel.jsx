import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import style from "./TwiceExchange.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
	setTwiceExchanger,
	setisTwice,
} from "../../store/itemsSlice/itemsSlice";
export const TwiceExchange = () => {
	const dispatch = useDispatch();
	const { currentFrom, currentTo, isTwice } = useSelector((state) => ({
		currentFrom: state.itemsSlice.currentFrom,
		currentTo: state.itemsSlice.currentTo,
		isTwice: state.itemsSlice.isTwice,
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
					`https://change.pro/api/twice_exchange?quantity=${val2}&from=${currentFrom}&to=${currentTo}&is_give=false&is_commission=false`
				)
				.then(function (response) {
					dispatch(setTwiceExchanger(response.data.data));
					dispatch(setisTwice(true));
				});
		}

		if (inputGive.current.value.length !== 0) {
			axios
				.get(
					`https://change.pro/api/twice_exchange?quantity=${val}&from=${currentFrom}&to=${currentTo}&is_give=true&is_commission=false`
				)
				.then(function (response) {
					dispatch(setTwiceExchanger(response.data.data));
					dispatch(setisTwice(true));
				});
		}
	};

	const clearTwice = () => {
		dispatch(setisTwice(false));
	};

	useEffect(() => {
		if (isTwice == true) {
			axios
				.get(
					`https://change.pro/api/twice_exchange?quantity=1&from=${currentFrom}&to=${currentTo}&is_give=true&is_commission=false`
				)
				.then(function (response) {
					dispatch(setTwiceExchanger(response.data.data));
				});
		}
	}, [currentFrom, currentTo, isTwice]);

	return (
		<div className={style.TwiceChange + ' ' + style.FormFilter + ' row'}>
			<div className="col-lg-2"></div>
			<div className="col-lg-3 col-6">
				<label className={style.FormFilter__item + ' ' + style.left} htmlFor="">
					<span className={style.FormFilter__label__text}>Oтдаете
						<span className={style.FormFilter__label__current}>{currentFrom}</span>
					</span>
					<input
						className={style.FormFilter__item__input}
						onChange={(e) => setCalculetedAmountGive(e)}
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
						onClick={clearTwice}
						className={style.FormFilter__item__btn + ' ' + style.FormFilter__item__btn__alt}
					>
						Очистить фильтры
					</button>
				</div>
			</div>
		</div>
	);
};
