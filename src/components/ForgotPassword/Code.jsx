import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./ForgotPassword.module.scss";
import axios from "axios";

export default function Code() {
	const [code, setCode] = useState('');
	const dispatch = useDispatch();
	const CodePassword = () => {
		axios
			.get(`https://change.pro/api/auth/register`, {
				code: code,
			})
			.then(function (response) {
				navigate("/account");
			})
			.catch(function (error) {
				setErr(error.response.data.message);
			});
	};
	const CodeSubmit = () => {

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

	const changeCodeValue = (e) => {
		dispatch(setCode(e.target.value));
	};

	return (
		<div className={style.Form}>
			<div className={style.Form__header + ' p-unbottom'}>
				<h1 className={style.Form__title}>Сброс пароля</h1>
			</div>
			<div className={style.Form__container}>
				<div className={style.Form__container__inputBox}>
					<div className={style.Form__notice}>Введите код полученный по СМС или E-mail</div>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="code">
						<input
							required
							name="code"
							id="code"
							placeholder=" "
							onChange={(e) => changeCodeValue(e)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__label__text}>Введите код <abbr title="обязательно">*</abbr></span>
					</label>
				</div>
				<div className={style.Form__container__inputBox + ' m-untop'}>
					<div className={style.Form__agree}>«<Link onClick={CodeSubmit}>Отправить код ещё раз</Link>» через 60 сек.</div>
				</div>
				<div className={style.Form__container__inputBox}>
					<button className={style.Form__btn} onClick={CodePassword}>
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