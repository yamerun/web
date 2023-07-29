import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import style from "./MainPage.module.scss";

import { SearchMenu } from "../../components/SearchMenu/SearchMenu";
//import { Carousel } from "../../components/Advertisement/Carousel";
import { Fillters } from "../../components/Fillters/Fillters";
import { Article } from "../../components/Article/Article";
import { ArticleTop } from "../../components/Article/ArticleTop";

import styleSearchMenu from "../../components/SearchMenu/SearchMenu.module.scss";
import {
	setItems2Reducer,
	setItemsReducer,
} from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemFromReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemToReducer } from "../../store/itemsSlice/itemsSlice";

import axios from "axios";

export const MainPageAttrs = () => {
	const dispatch = useDispatch();

	let { exchange } = useLoaderData();
	exchange = exchange.split('-to-');

	if (exchange.length == 2) {

		const [params, setSearchParams] = useSearchParams();
		if (params != null) {

			if (params.get('from') != null) {

				const inputvalue = params.get('from');
				const setSearchMenuFrom = setInterval(() => {
					if (document.getElementById('SearchMenuFrom')) {
						document.getElementById('SearchMenuFrom').value = inputvalue;
						clearInterval(setSearchMenuFrom);
					}
				}, 500);

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
				}, [inputvalue]);
			}

			if (params.get('to') != null) {

				const input2value = params.get('to');
				const setSearchMenuTo = setInterval(() => {
					if (document.getElementById('SearchMenuTo')) {
						document.getElementById('SearchMenuTo').value = input2value;
						clearInterval(setSearchMenuTo);
					}
				}, 500);

				useEffect(() => {
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
				}, [input2value]);
			}
		}

		dispatch(setCurrentItemFromReducer(exchange[0]));
		dispatch(setCurrentItemToReducer(exchange[1]));

		const setbtnElements = setInterval(() => {
			if (document.querySelectorAll(`.${styleSearchMenu.SearchMenu__item}`)) {
				const btnElements = document.querySelectorAll(`.${styleSearchMenu.SearchMenu__item}`);
				for (let i of btnElements) {
					if (i.querySelector(`.${styleSearchMenu.SearchMenu__item__currency}`).textContent.toLowerCase() == exchange[0]) {
						i.classList.add(`${styleSearchMenu.active}`);
						break;
					}
				}

				clearInterval(setbtnElements);
			}
		}, 1000);

		const setbtnElements2 = setInterval(() => {
			if (document.querySelectorAll(`.${styleSearchMenu.SearchMenu__item2}`)) {
				const btnElements2 = document.querySelectorAll(`.${styleSearchMenu.SearchMenu__item2}`);
				for (let i of btnElements2) {
					if (i.querySelector(`.${styleSearchMenu.SearchMenu__item__currency}`).textContent.toLowerCase() == exchange[1]) {
						i.classList.add(`${styleSearchMenu.active}`);
						break;
					}
				}

				clearInterval(setbtnElements2);
			}
		}, 1000);
	}

	return (
		<div className={style.MainPage}>
			<div className={style.MainPage__containerMenu}>
				<SearchMenu />
				<div className={style.MainPage__rightMenu}>
					<ArticleTop />
					<Fillters />
					<Article />
				</div>
			</div>
		</div>
	);
};

export const MainPageLoader = async ({ params }) => {
	const exchange = params.exchange;
	return { exchange };
};