import React, { useState, useRef, useEffect } from "react";
import style from "./inputRegistration.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setverifiedPassword } from "../../store/userAccountSlice/AccountSlice";
import { setEmail } from "../../store/userAccountSlice/AccountSlice";
import { setPassword } from "../../store/userAccountSlice/AccountSlice";
import { setName } from "../../store/userAccountSlice/AccountSlice";
import { RegistrationPopup } from "../RegistrationPopup/Popup";

import img from "../../assets/imgs/icon-social-auth-vk.png";
import img2 from "../../assets/imgs/icon-social-auth-google.png";
import img3 from "../../assets/imgs/icon-social-auth-mail-ru.png";
import img4 from "../../assets/imgs/icon-social-auth-ok.png";

export const InputRegistration = (e) => {
	const { password, verifiedPassword, email, name } = useSelector((state) => ({
		password: state.AccountSlice.password,
		verifiedPassword: state.AccountSlice.verifiedPassword,
		email: state.AccountSlice.email,
		name: state.AccountSlice.name,
	}));

	const dispatch = useDispatch();
	const [err, setErr] = useState("");
	const [isModal, setModal] = useState(false);
	const navigate = useNavigate();
	const ref = useRef(null);
	const Register = () => {
		axios
			.post(`https://change.pro/api/auth/register`, {
				name: name,
				email: email,
				password: password,
				password_confirmation: verifiedPassword,
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
		navigate("/changePro");
	};

	const ChangeVerifyPassstValue = (e) => {
		dispatch(setverifiedPassword(e.target.value));
	};

	const changePassValue = (e) => {
		dispatch(setPassword(e.target.value));
	};

	const changeEmailValue = (e) => {
		dispatch(setEmail(e.target.value));
	};

	const changeNameValue = (e) => {
		dispatch(setName(e.target.value));
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
		for (let i = 0; i < labels.length; i++) {
			const input = labels[i].querySelector('input') || labels[i].querySelector('select');
			if (input) {
				if (input.value != '') {
					labels[i].classList.add(`${style.active}`);
				}
			}
		}
	});

	return (
		<div className={style.Form}>
			<div className={style.Form__header}>
				<h1 className={style.Form__title}>Регистрация</h1>
			</div>
			<div className={style.Form__container}>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="login">
						<input
							required
							name="login"
							id="login"
							placeholder=" "
							onChange={(e) => changeNameValue(e)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__label__text}>Логин <abbr title="обязательно">*</abbr></span>
					</label>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="email">
						<input
							required
							name="e-mail"
							id="e-mail"
							type="email"
							placeholder="E-mail"
							onChange={(e) => changeEmailValue(e)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
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
						<span className={style.Form__container__label__text}>Пароль<abbr title="обязательно">*</abbr></span>
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
					<button className={style.Form__btn} onClick={Register}>
						Зарегистрироваться
					</button>
				</div>
				<div className={style.Form__container__inputBox}>
					<div className={style.Form__agree}>Нажав «Зарегистрироваться», я принимаю «<Link to="/register">Условия обработки персональных данных</Link>»</div>
				</div>
				<span className={style.Form__message}>{err}</span>
				{/*
				<div className={style.Form__container__inputBox + ' f-wrap txt-center'}>
					<h3>Регистрация с помощью:</h3>
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
				 */}
			</div>

			<div className={style.Form__footer}>
				<div className={style.Form__footer__link}>
					<Link to="/login">Я уже зарегистрирован</Link>
				</div>
				<div className={style.Form__footer__link}>
					<Link to="/exchanger/register">
						Создать аккаунт обменника
					</Link>
				</div>
				{/* <button onClick={() => setModal(true)}>Click Here</button> */}
			</div>

			<RegistrationPopup
				isVisible={isModal}
				onClose={() => setModal(false)}
			/>
		</div>
	);
};
