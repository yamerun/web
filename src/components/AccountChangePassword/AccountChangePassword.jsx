import React from "react";
import style from "./ChangePass.module.scss";
import axios from "axios";
export default function ChangePassword() {
	const [active, setActive] = React.useState(false);
	const [newPass, setNewPass] = React.useState("");
	const [newPassConfirm, setNewPassConfirm] = React.useState("");
	const [message, setMessage] = React.useState('')
	const ChangeValuePassword = ({ value }) => {
		setNewPass(value);
		document.querySelector(`.${style.NewPass__inputBox__submit}`).classList.remove(`${style.NewPass__disabled}`);
	};
	const ChangeValueConfirmPassword = ({ value }) => {
		setNewPassConfirm(value);
		document.querySelector(`.${style.NewPass__inputBox__submit}`).classList.remove(`${style.NewPass__disabled}`);
	};

	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
		},
	};

	const handleChangeValue = (target) => {
		const inputbox = target.closest(`.${style.NewPass__inputBox}`);
		const input = inputbox.querySelector('input[type="text"]') || inputbox.querySelector('input[type="password"]');

		if (input.getAttribute('type') == 'password') {
			input.setAttribute('type', 'text');
			target.classList.add(`${style.password__on}`);
		} else {
			input.setAttribute('type', 'password');
			target.classList.remove(`${style.password__on}`);
		}
	}

	const ChangePassword = () => {
		setMessage('');
		let errors = [];

		if (newPass.length > 45) {
			errors.push('Пароль не должен превышать 45 символов.');
		}

		if (newPass != newPassConfirm) {
			errors.push('Пароли не совпадают.');
		}

		if (errors.length) {
			setMessage(errors.join("\n\r"));
			return null;
		}

		axios
			.post(
				"https://change.pro/api/user/change_password",
				{
					password: newPass,
					password_confirmation: newPassConfirm,
				},
				config
			)
			.then(function (response) {
				setMessage(response.data.message);
			}).catch(function (error) {
				setMessage(error.message);
			});
	};
	return (
		<div className={style.NewPass__panel}>
			<h4>Изменить пароль</h4>
			<div className={style.NewPass__inputBox}>
				<span className={style.NewPass__inputBox__label}>Новый пароль</span>
				<input
					type="password"
					onChange={(e) => ChangeValuePassword(e.target)}
					placeholder="Пароль (не менее 8-ми символов)"
					required
				/>
				<span
					className={style.NewPass__inputBox__change + ' ' + style.password}
					onClick={(e) => handleChangeValue(e.target)}
				>Посмотреть</span>
			</div>
			<div className={style.NewPass__inputBox}>
				<span className={style.NewPass__inputBox__label}>Повторите пароль</span>
				<input
					type="password"
					onChange={(e) => ChangeValueConfirmPassword(e.target)}
					placeholder="Подтвердите пароль"
					required
				/>
				<span
					className={style.NewPass__inputBox__change + ' ' + style.password}
					onClick={(e) => handleChangeValue(e.target)}
				>Посмотреть</span>
			</div>
			<span style={{ color: 'white' }}>{message}</span>
			<div className={style.NewPass__inputBox + ' txt-center'}>
				<p className="spacer"></p>
				<button
					onClick={ChangePassword}
					className={style.NewPass__inputBox__submit + ' ' + style.NewPass__disabled}
				>Сохранить</button>
			</div>
		</div >
	);
}
