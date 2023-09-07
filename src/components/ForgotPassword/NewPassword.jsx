import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./ForgotPassword.module.scss";
import axios from "axios";
import { RegistrationPopup } from "../RegistrationPopup/Popup";

export default function NewPassword() {
	const [email, setEmail] = useState('');
	const [token, setToken] = useState('');
	const [password, setPassword] = useState('');
	const [verifiedPassword, setverifiedPassword] = useState('');
	const [message, setMessage] = useState('');
	const [isModal, setModal] = useState(false);
	const dispatch = useDispatch();
	const CodePassword = () => {
		axios
			.post(
				"https://change.pro/api/user/change_password",
				{
					email: email,
					password: password,
					password_confirmation: verifiedPassword,
					token: token
				},
			)
			.then(function (response) {
				setMessage(response.data.message);
				if (response.data?.success == true) {
					setModal(true);
					setTimeout(function () {
						navigate("/login");
					}, 30000);
				}
			})
			.catch(function (error) {
				setMessage(error.message);
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

	useEffect(() => {
		const queryParameters = new URLSearchParams(window.location.search);
		setEmail(queryParameters.get('email'));
		setToken(queryParameters.get('token'));
		focusLabel(document.getElementById('email'));
	}, []);

	return (
		<div className={style.Form}>
			<div className={style.Form__header + ' p-unbottom'}>
				<h1 className={style.Form__title}>Задайте пароль</h1>
			</div>
			<div className={style.Form__container}>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="email">
						<input
							required
							name="token"
							id="token"
							value={token}
							type="hidden"
						/>
						<input
							required
							name="email"
							id="email"
							placeholder=""
							value={email}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
							readOnly
						/>
						<span className={style.Form__container__label__text}>E-mail<abbr title="обязательно">*</abbr></span>
					</label>
				</div>
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
				<span style={{ color: 'white' }}>{message}</span>
				<div className={style.Form__container__inputBox}>
					<button className={style.Form__btn} onClick={CodePassword}>
						Отправить
					</button>
				</div>
			</div>
			<RegistrationPopup
				isVisible={isModal}
				type="reset"
				onClose={() => setModal(false)}
			/>
		</div>
	);
}