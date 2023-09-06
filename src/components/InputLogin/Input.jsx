import style from "./Input.module.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
	setLoginEmail,
	setLoginPassword,
} from "../../store/userAccountSlice/AccountSlice";

import img from "../../assets/imgs/icon-social-auth-vk.png";
import img2 from "../../assets/imgs/icon-social-auth-google.png";
import img3 from "../../assets/imgs/icon-social-auth-mail-ru.png";
import img4 from "../../assets/imgs/icon-social-auth-ok.png";

export const Input = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [err, setErr] = useState("");
	const { email, password } = useSelector((state) => ({
		email: state.AccountSlice.emailLogin,
		password: state.AccountSlice.passwordLogin,
	}));

	const Login = () => {
		axios
			.post(`https://change.pro/api/auth/login`, {
				email: email,
				password: password,
			})
			.then(function (response) {
				localStorage.setItem("jwt", response.data.token);
				navigate("/account");
			})
			.catch(function (error) {
				setErr(error.response.data.message);
			});
	};

	const goMain = () => {
		navigate("/");
	};

	const InputLoginField = (e) => {
		dispatch(setLoginEmail(e.target.value));
	};

	const InputPassField = (e) => {
		dispatch(setLoginPassword(e.target.value));
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

	const visibilityPassword = (target) => {
		const label = target.parentElement;
		const input = label.querySelector('input[type=text]') || label.querySelector('input[type=password]');

		if (input) {
			if (input.getAttribute('type') == 'password') {
				input.setAttribute('type', 'text');
				target.classList.add(`${style.on}`);
			} else {
				input.setAttribute('type', 'password');
				target.classList.remove(`${style.on}`);
			}
		}
	}

	useEffect(() => {
		const labels = document.querySelectorAll(`.${style.Form__container__label}`);
		for (let label of labels) {
			const input = label.querySelector('input') || label.querySelector('select');
			if (input) {
				if (input.value != '') {
					label.classList.add(`${style.active}`);
				}
			}
		}
	});

	return (
		<div className={style.Form}>
			<div className={style.Form__header}>
				<h1 className={style.Form__title}>Вход</h1>
			</div>
			<div className={style.Form__container}>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="login">
						<input
							required
							name="login"
							id="login"
							placeholder=" "
							onChange={(e) => InputLoginField(e)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__label__text}>Логин <abbr title="обязательно">*</abbr></span>
					</label>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="password">
						<input
							required
							name="password"
							id="password"
							type="password"
							placeholder=" "
							onChange={(e) => InputPassField(e)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__input__visibility} onClick={(e) => visibilityPassword(e.target)}>Скрыть</span>
						<span className={style.Form__container__label__text}>Пароль <abbr title="обязательно">*</abbr></span>
					</label>
				</div>
				<div className={style.Form__container__inputBox + ' f-column txt-center'}>
					<button className={style.Form__btn} onClick={Login}>
						Войти
					</button>
					<Link className={style.Form__subtext} to="/forget-password/id">Забыли пароль?</Link>
				</div>
				<span className={style.Form__message}>{err}</span>
				{/*
				<div className={style.Form__container__inputBox + ' f-wrap txt-center'}>
					<h3>Войти с помощью:</h3>
					<div className={style.Form__registerVariants}>
						<div className={style.Form__registerVariants}>
							<Link className={style.Form__registerVariants__item} to="">
								<img src={img} alt="vk" />
							</Link>
							<Link className={style.Form__registerVariants__item} to="">
								<img src={img2} alt="gmail" />
							</Link>
							<Link className={style.Form__registerVariants__item} to="">
								<img src={img3} alt="mailru" />
							</Link>
							<Link className={style.Form__registerVariants__item} to="">
								<img src={img4} alt="ok" />
							</Link>
						</div>
					</div>
				</div>
				*/}
			</div>
			<div className={style.Form__footer}>
				<div className={style.Form__footer__link}>
					<Link to="/register">Зарегистрироваться</Link>
					<div className={style.Form__subtext}>если вы новый пользователь<br />или</div>
					<Link to="/exchanger/register">Создать аккаунт обменника</Link>
				</div>
			</div>
		</div>
	);
};
