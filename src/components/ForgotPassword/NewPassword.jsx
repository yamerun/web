import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./ForgotPassword.module.scss";
import axios from "axios";

export default function NewPassword() {
	const [password, setPassword] = useState('');
	const [verifiedPassword, setverifiedPassword] = useState('');
	const dispatch = useDispatch();
	const CodePassword = () => {
		axios
			.get(`https://change.pro/api/auth/register`, {
				password: password,
				password_confirmation: verifiedPassword,
			})
			.then(function (response) {
				navigate("/account");
			})
			.catch(function (error) {
				setErr(error.response.data.message);
			});
	};
	const ChangeVerifyPassstValue = (e) => {
		dispatch(setverifiedPassword(e.target.value));
	};

	const changePassValue = (e) => {
		dispatch(setPassword(e.target.value));
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
				<h1 className={style.Form__title}>Задайте пароль</h1>
			</div>
			<div className={style.Form__container}>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="password">
						<input
							required
							name="password"
							id="password"
							type="password"
							placeholder="От трёх символов"
							onChange={(e) => changePassValue(e)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__input__visibility} onClick={(e) => visibilityPassword(e.target)}>Скрыть</span>
						<span className={style.Form__container__label__text}>Новый пароль<abbr title="обязательно">*</abbr></span>
					</label>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="passwordConfirm">
						<input
							required
							name="passwordConfirm"
							id="passwordConfirm"
							type="password"
							placeholder="Повторите пароль"
							onChange={(e) => ChangeVerifyPassstValue(e)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__input__visibility} onClick={(e) => visibilityPassword(e.target)}>Скрыть</span>
						<span className={style.Form__container__label__text}>Подтверждение пароля<abbr title="обязательно">*</abbr></span>
					</label>
				</div>
				<div className={style.Form__container__inputBox}>
					<button className={style.Form__btn} onClick={CodePassword}>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	);
}