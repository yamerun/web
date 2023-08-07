import React, { useEffect } from "react";
import style from "./ExchangerRegForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputPhone from 'react-phone-number-input/input'

export default function ExchanngerRegisterForm() {
	const [login, setLogin] = React.useState("");
	const [pass, setPass] = React.useState("");
	const [confirmpass, setConfirmpass] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [num, setNum] = React.useState("");
	const [telegram, setTelegram] = React.useState("");
	const [url, setUrl] = React.useState("");
	const [fileUrl, setFileUrln] = React.useState("");
	const [message, setMessage] = React.useState('');
	const navigate = useNavigate();

	const changeValue = ({ name, value }) => {
		switch (name) {
			case "login":
				setLogin(value);
				break;
			case "password":
				setPass(value);
				break;
			case "passwordConfirm":
				setConfirmpass(value);
				break;
			case "e-mail":
				setEmail(value);
				break;
			case "phoneNum":
				setNum(value);
				break;
			case "telegram":
				setTelegram(value);
				break;
			case "exchangerLink":
				setUrl(value);
				break;
			case "fileLink":
				setFileUrln(value);
				break;
		}
	};

	const changePhone = (value) => {
		setNum(value);
	};

	// TODO всё вынести в отдельный файл

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

	const RegisterExchanger = () => {
		axios.post(`https://change.pro/api/auth/register_exchanger`, {
			name: login,
			email: email,
			password: pass,
			password_confirmation: confirmpass,
			phone: num,
			telegram: telegram,
			xml_url: fileUrl,
			site_url: url,
		}).then(function (response) {
			setMessage(response.data.message);
			localStorage.setItem('jwt', response.data.token)
			navigate('/InfoPage')
		}).catch(function (error) {
			setMessage(error.response.data.message)
		});
	};

	return (
		<div className={style.Form}>
			<div className={style.Form__header}>
				<h1 className={style.Form__title}>Регистрация обменника</h1>
			</div>
			<div className={style.Form__container}>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="login">
						<input
							required
							name="login"
							id="login"
							placeholder=" "
							onChange={(e) => changeValue(e.target)}
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
							placeholder="От трёх символов"
							onChange={(e) => changeValue(e.target)}
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
							onChange={(e) => changeValue(e.target)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__input__visibility} onClick={(e) => visibilityPassword(e.target)}>Скрыть</span>
						<span className={style.Form__container__label__text}>Подтверждение пароля<abbr title="обязательно">*</abbr></span></label>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="email">
						<input
							required
							name="e-mail"
							id="e-mail"
							type="email"
							placeholder="E-mail"
							onChange={(e) => changeValue(e.target)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__label__text}>E-mail<abbr title="обязательно">*</abbr></span></label>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="phoneNum">
						<InputPhone
							required
							name="phoneNum"
							id="phoneNum"
							placeholder="+7 (800) 123-4567"
							country="RU"
							international
							withCountryCallingCode
							onChange={(e) => changePhone(e)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__label__text}>Номер телефона<abbr title="обязательно">*</abbr></span></label>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="telegram">
						<input
							required
							name="telegram"
							id="telegram"
							placeholder=" "
							onChange={(e) => changeValue(e.target)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__label__text}>Телеграмм<abbr title="обязательно">*</abbr></span></label>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="exchangerLink">
						<input
							required
							name="exchangerLink"
							id="echangerLink"
							placeholder=" "
							onChange={(e) => changeValue(e.target)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__label__text}>Ссылка на сайт обменника<abbr title="обязательно">*</abbr></span></label>
				</div>
				<div className={style.Form__container__inputBox}>
					<label className={style.Form__container__label} htmlFor="fileLink">
						<input
							required
							name="fileLink"
							id="fileLink"
							placeholder=" "
							onChange={(e) => changeValue(e.target)}
							onBlur={(e) => activeLabel(e.target)}
							onFocus={(e) => focusLabel(e.target)}
						/>
						<span className={style.Form__container__label__text}>Ссылка на файл с курсами<abbr title="обязательно">*</abbr></span></label>
				</div>
				<div className={style.Form__container__inputBox}>
					<button
						className={style.Form__btn}
						onClick={RegisterExchanger}
					>
						Регистрация
					</button>
				</div>
				<div className={style.Form__container__inputBox}>
					<div className={style.Form__agree}>Нажав «Регистрация», я принимаю «<Link to="/register">Условия обработки персональных данных</Link>»</div>
				</div>

			</div>
			<span className={style.Form__message}>{message}</span>
			<div className={style.Form__footer}>
				<div className={style.Form__footer__link}>
					<Link to="/register">
						Зарегистрироватсья как пользователь
					</Link>
				</div>
			</div>
		</div>
	);
}
