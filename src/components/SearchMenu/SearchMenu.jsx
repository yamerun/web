import React, { useRef, useEffect, useState } from "react";
import style from "./SearchMenu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
	setItems2Reducer,
	setItemsReducer,
} from "../../store/itemsSlice/itemsSlice";
import { setitemIdReducer } from "../../store/itemsSlice/itemsSlice";
import { setItemReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemFromReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemToReducer } from "../../store/itemsSlice/itemsSlice";
import { setIsFilltersClear } from "../../store/itemsSlice/itemsSlice";
import axios from "axios";

export const SearchMenu = () => {
	const ref = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const { items, items2, isFilltersClear } = useSelector((state) => ({
		items: state.itemsSlice.items,
		items2: state.itemsSlice.items2,
		isFilltersClear: state.itemsSlice.isFilltersClear,
	}));
	const [inputvalue, setInputValue] = useState("");
	const [input2value, setInput2Value] = useState("");
	const [emoney, setEmoney] = useState([]);
	const [emoney2, setEmoney2] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get(`https://change.pro/api/exchangers/currencies/list?currency_type_id=1`)
			.then(function (response) {
				dispatch(setItemsReducer(response.data.data));
				dispatch(setItems2Reducer(response.data.data));
			})
			.catch(function (error) {
				console.log(error);
			});
		axios
			.get(
				`https://change.pro/api/exchangers/currencies/list?currency_type_id=2`
			)
			.then(function (response) {
				setEmoney(response.data.data);
				setEmoney2(response.data.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const ShowMoreToBot = () => {
		ref2.current.classList.toggle(`${style.showEmoney}`);
		ref.current.classList.toggle(`${style.show}`);
	};

	/**
	 * Функция определния кода выбранных валяют для адресной строки
	 */
	const setUrlItems = () => {

		let btnElementActive = document.querySelector(`.${style.SearchMenu__item}.${style.active}`);
		let btnElement2Active = document.querySelector(`.${style.SearchMenu__item2}.${style.active}`);

		// Если есть две вабранные валюты
		if (btnElementActive && btnElement2Active) {

			// Получаем коды выбранных валют
			btnElementActive = btnElementActive.querySelector(`.${style.SearchMenu__item__currency}`).textContent.toLocaleLowerCase();
			btnElement2Active = btnElement2Active.querySelector(`.${style.SearchMenu__item__currency}`).textContent.toLocaleLowerCase();

			// Задаём базовый URL
			// let url = new URL(location);
			let url = window.location.protocol + '//' + window.location.host;
			// Задаём новые URL с кодами выбранных валют
			let newUrl = new URL('changePro/' + btnElementActive + '-to-' + btnElement2Active + '/', url);

			// Если есть таблица обменников для вывода результатов поиска по выбранными валютам
			if (document.getElementById('courseBorder')) {
				// Добавляем в историю браузера новый URL
				history.pushState({}, '', newUrl);
			} else {
				// Если был поиск по валютам в поле "Отдаёте"
				if (document.getElementById('SearchMenuFrom').value) {
					// Добавялем запрос поиска в параметры нового URL
					newUrl.searchParams.set('from', document.getElementById('SearchMenuFrom').value);
				}
				// Если был поиск по валютам в поле "Получаете"
				if (document.getElementById('SearchMenuTo').value) {
					// Добавялем запрос поиска в параметры нового URL
					newUrl.searchParams.set('to', document.getElementById('SearchMenuTo').value);
				}
				// Если нет таблица обменников, то редирект на страницу выбора валют с параметрами
				window.location.href = newUrl.href;
			}
		}
	}

	const getItemFrom = (e) => {
		dispatch(setitemIdReducer(e.target.id));
		dispatch(setCurrentItemFromReducer(e.target.querySelector(`.${style.SearchMenu__item__currency}`).textContent));
		dispatch(setItemReducer(e.target.querySelector(`.${style.SearchMenu__item__currency}`).textContent));

		e.target.classList.add(`${style.active}`);
		const btnElements = document.querySelectorAll(`.${style.SearchMenu__item}`);
		for (let i of btnElements) {
			if (i != e.target) {
				i.classList.remove(`${style.active}`);
			}
		}
		dispatch(setIsFilltersClear(false));
		setUrlItems();
	};

	const getItemTo = (e) => {
		dispatch(setCurrentItemToReducer(e.target.querySelector(`.${style.SearchMenu__item__currency}`).textContent));

		const btnElements = document.querySelectorAll(
			`.${style.SearchMenu__item2}`
		);
		e.target.classList.add(`${style.active}`);
		for (let i of btnElements) {
			if (i != e.target) {
				i.classList.remove(`${style.active}`);
			}
		}
		dispatch(setIsFilltersClear(false));
		setUrlItems();
	};

	useEffect(() => {
		if (isFilltersClear === true) {
			const btnElements = document.querySelectorAll(
				`.${style.SearchMenu__item}`
			);
			for (let i of btnElements) {
				i.classList.remove(`${style.active}`);
			}
			const btnElements2 = document.querySelectorAll(
				`.${style.SearchMenu__item2}`
			);
			for (let i of btnElements2) {
				i.classList.remove(`${style.active}`);
			}
		}
	}, [isFilltersClear]);

	const ShowMoreEmoney = () => {
		ref2.current.classList.toggle(`${style.showEmoney}`);
	};

	const ChangeInputVal = (e) => {
		switch (e.target.name) {
			case "from":
				console.log(e.target.value);
				setInputValue(e.target.value);
				break;
			case "to":
				setInput2Value(e.target.value);
				break;
		}
	};

	useEffect(() => {
		axios
			.get(
				`https://change.pro/api/exchangers/currencies/search?query=${inputvalue}`
			)
			.then(function (response) {
				dispatch(setItemsReducer(response.data.data));
			})
			.catch(function (error) {
				console.log(error);
			});
		axios
			.get(
				`https://change.pro/api/exchangers/currencies/search?query=${input2value}`
			)
			.then(function (response) {
				dispatch(setItems2Reducer(response.data.data));
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [inputvalue, input2value]);

	return (
		<div className={style.SearchMenu} ref={ref3}>
			<div className={style.SearchMenu__inputs}>
				<div className={style.SearchMenu__contolls}>
					<input
						id="SearchMenuFrom"
						className={style.SearchMenu__inputField}
						placeholder="Отдаете"
						onChange={(e) => ChangeInputVal(e)}
						name="from"
					/>
					<button className={style.SearchMenu__btn} />
				</div>
				<div className={style.SearchMenu__separation}></div>
				<div className={style.SearchMenu__contolls}>
					<input
						id="SearchMenuTo"
						className={style.SearchMenu__inputField}
						placeholder="Получаете"
						onChange={(e) => ChangeInputVal(e)}
						name="to"
					/>
					<button className={style.SearchMenu__btn} />
				</div>
			</div>
			<div className={style.SearchMenu__itemsPayment__header}>
				<p className={style.SearchMenu__itemsPayment__header__content}>
					Криптовалюта
				</p>
			</div>
			<div className={style.SearchMenu__items} ref={ref}>
				<ul className={style.SearchMenu__itemsList}>
					{items.map((item) => (
						<li
							key={item.id}
							className={style.SearchMenu__item}
							id={item.id}
							onClick={(e) => getItemFrom(e, item)}
						>
							<span className={style.SearchMenu__item__title}>{item.title}</span>
							<span className={style.SearchMenu__item__currency}>{item.currency}</span>
						</li>
					))}
				</ul>
				<ul className={style.SearchMenu__itemsList}>
					{items2.map((item) => (
						<li
							key={item.id}
							className={style.SearchMenu__item2}
							id={item.id}
							onClick={(e) => getItemTo(e)}
						>
							<span className={style.SearchMenu__item__title}>{item.title}</span>
							<span className={style.SearchMenu__item__currency}>{item.currency}</span>
						</li>
					))}
				</ul>
			</div>
			<div className={style.SearchMenu__itemsPayment__header}>
				<p className={style.SearchMenu__itemsPayment__header__content}>
					Электронные деньги
				</p>
			</div>

			<div className={style.SearchMenu__Emoney} ref={ref2}>
				<div className={style.ItemsPayment}>
					<ul className={style.ItemsPayment__itemsList}>
						{emoney.map((item) => (
							<li
								key={item.id}
								className={style.SearchMenu__item}
								onClick={(e) => getItemFrom(e, item)}
							>
								<span className={style.SearchMenu__item__title}>{item.title}</span>
								<span className={style.SearchMenu__item__currency}>{item.currency}</span>
							</li>
						))}
					</ul>
					<ul className={style.ItemsPayment__itemsList}>
						{emoney2.map((item) => (
							<li
								key={item.id}
								className={style.SearchMenu__item2}
								onClick={(e) => getItemTo(e)}
							>
								<span className={style.SearchMenu__item2__title}>{item.title}</span>
								<span className={style.SearchMenu__item2__currency}>{item.currency}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={style.SearchMenu__ShowMore}>
				<button
					className={style.SearchMenu__ShowMorebtn}
					onClick={() => ShowMoreToBot()}
				>Раскрыть список</button>
			</div>
		</div>
	);
};
