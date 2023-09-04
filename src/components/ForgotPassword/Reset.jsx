import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./ForgotPassword.module.scss";
import axios from "axios";

export default function Reset() {
	const [login, setLogin] = useState('');
	const dispatch = useDispatch();
	const ResetPassword = () => {
		axios
			.get(`https://change.pro/api/auth/register`, {
				login: login,
			})
			.then(function (response) {
				navigate("/account");
			})
			.catch(function (error) {
				setErr(error.response.data.message);
			});
	};

	const activeLabel = (target) => {
		const labelName = target.closest(`.${style.Form__container__label}`);
		if (target.value == '') {
			labelName.classList.remove(`${style.active}`);
		} else {
			labelName.classList.add(`${style.active}`);
		}
	}

	const focusLabel = (target) => {
		const labelName = target.closest(`.${style.Form__container__label}`);
		labelName.classList.add(`${style.active}`);
	}

	const changeLoginValue = (e) => {
		dispatch(setLogin(e.target.value));
	};

	return (
		<div className={style.Form}>
			<div className={style.Form__header + ' p-unbottom'}>
				<h1 className={style.Form__title}>Сброс пароля</h1>
			</div>
			<div className={style.Form__container}>
				<div className={style.Form__container__inputBox}>
					<div className={style.Form__notice}>Введите телефон или почту, которые привязаны к аккаунту</div>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="login">
						<input
							required
							name="login"
							id="login"
							placeholder=" "
							onChange={(e) => changeLoginValue(e)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__label__text}>Телефон или E-mail <abbr title="обязательно">*</abbr></span>
					</label>
				</div>
				<div className={style.Form__container__inputBox}>
					<button className={style.Form__btn} onClick={ResetPassword}>
						Продолжить
					</button>
				</div>
			</div>

			<div className={style.Form__footer}>
				<div className={style.Form__footer__link}>
					<Link to="/register">Зарегистрироваться</Link>
					<div className={style.Form__subtext}>если вы новый пользователь</div>
				</div>
			</div>
		</div>
	);
}