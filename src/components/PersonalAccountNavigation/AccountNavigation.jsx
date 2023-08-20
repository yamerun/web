import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./PersonalAccountNavigation.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
export default function AccountNavigation({ item = {}, type = '', exchanger_id = 0 }) {
	const [dataAccount, setAccountData] = useState([]);
	const [account, setAccount] = useState({ name: '', type: 'user', exchanger_id: 0 });
	const navigate = useNavigate();
	const handleSelect = (e) => {
		const btnElements = document.querySelectorAll(
			`.${style.PersonalAccount__container__leftBar__navigation__list__item}`
		);
		e.target.classList.add(`${style.active}`);
		for (let i of btnElements) {
			if (i != e.target) {
				i.classList.remove(`${style.active}`);
			}
		}
	};
	useEffect(() => {
		switch (type) {
			case 'exchanger':
				axios
					.get(`https://change.pro/api/exchangers/get?exchanger_id=${localStorage.getItem("userId")}`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("jwt")}`,
						},
					})
					.then(function (response) {
						console.log('account.exchanger_id');
						console.log(response);
						setAccount(response.data.data);
					})
					.catch(function (error) {
						console.log(error.message);
					});
				break;
			default:
				setAccount(item.data);
				break;
		}
	}, []);

	const LogOut = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("userRole");
		navigate("/");
	};

	// Выбор активного элемента меню
	const setCurrentNavigate = ({ isActive }) => (isActive ? (`${style.Navigation__list__item}` + ' ' + `${style.active}`) : `${style.Navigation__list__item}`);

	return (
		<nav className={style.Navigation}>
			<div className={style.Navigation__userName}>{account.name}</div>
			<ul className={style.Navigation__list}>
				<li className={style.Navigation__list__icon + ' ' + style.manage}>
					<NavLink
						className={setCurrentNavigate}
						onClick={(e) => handleSelect(e)}
						to="/account"
						end
					>
						Мой кабинет
					</NavLink>
				</li>
				{/* <li>
					<NavLink
						className={style.Navigation__list__item}
						onClick={(e) => handleSelect(e)}
					>
						Список операций
					</NavLink>
				</li>
				<li>
					<NavLink
						className={setCurrentNavigate}
						onClick={(e) => handleSelect(e)}
						to='/account/subscribe/detail'
					>
						Подписка
					</NavLink>
				</li>
				<li>
					<NavLink
						className={setCurrentNavigate}
						onClick={(e) => handleSelect(e)}
						to="/account/accountSettings"
					>
						Настройки аккаунта
					</NavLink>
				</li> */}
				<li className={style.Navigation__list__icon + ' ' + style.reviews}>
					<NavLink
						className={setCurrentNavigate}
						onClick={(e) => handleSelect(e)}
						to="/account/reviews"
					>
						Мои отзывы
					</NavLink>
				</li>
				<li className={style.Navigation__list__icon + ' ' + style.favorites}>
					<NavLink
						className={setCurrentNavigate}
						onClick={(e) => handleSelect(e)}
						to="/account/favoriteexchangers"
					>
						Избранные обменники
					</NavLink>
				</li>
				<li className={style.Navigation__list__icon + ' ' + style.logout}>
					<NavLink
						className={style.Navigation__list__item}
						onClick={LogOut}
						to="/account/logout"
					>
						Выйти из Аккаунта
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
