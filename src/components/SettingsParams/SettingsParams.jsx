import React from "react";
import style from "./SettingParams.module.scss";
import img from "../../assets/imgs/settings.svg";
import axios from "axios";
import PropTypes from "prop-types";
import InputPhone from 'react-phone-number-input/input';

SettingsParams.propTypes = {
	item: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	num: PropTypes.string.isRequired,
	telegram: PropTypes.string.isRequired,
};

export default function SettingsParams({ item }) {
	const [active, setActive] = React.useState({
		name: false,
		email: false,
		num: false,
		telegram: false,
	});
	const [message, setMessage] = React.useState("");
	const [newValues, setNewValues] = React.useState({
		name: item.data.name,
		email: item.data.email,
		phone: item.data.phone,
		telegram: item.data.telegram,
	});

	const handleChangeValue = (id) => {
		setActive({
			name: id === "name",
			email: id === "email",
			phone: id === "phone",
			telegram: id === "telegram",
		});

		const inputs = document.getElementsByName(id);
		if (inputs.length) {
			for (let i = 0; i < inputs.length; i++) {
				inputs[i].removeAttribute('readonly');
			}
		}
		document.getElementById(id).style.display = 'none';
	};

	const handleChangeInputVal = (e) => {
		setNewValues({ ...newValues, [e.target.name]: e.target.value });
		document.getElementById('saveChangesAccount').classList.remove(`${style.AccountSettings__disabled}`);
	};

	const changePhone = (value) => {
		setNewValues({ ...newValues, ['phone']: value });
		document.getElementById('saveChangesAccount').classList.remove(`${style.AccountSettings__disabled}`);
	};

	const handleSendRequest = () => {
		setMessage('');
		let errors = [];

		if (newValues.name.length > 45) {
			errors.push('Имя не должно превышать 45 символов.');
		}

		const phone = newValues.phone.replace(/[\(\)\s]/g, "");
		if (phone.length > 12) {
			errors.push('Телефонный номер не должен превышать 12 знаков.');
		} else {
			const phone_match = phone.match(/\+7\d{10}/g);
			if (!phone_match) {
				errors.push('Телефонный номер должен быть формата +7 999 999 9999.');
			} else {
				changePhone(phone_match);
			}
		}

		if (newValues.telegram.length > 45) {
			errors.push('Телеграм не должен превышать 45 символов.');
		}

		if (errors.length) {
			setMessage(errors.join("\n\r"));
			return null;
		}

		axios
			.post("https://change.pro/api/user/edit", newValues, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			})
			.then(function (response) {
				setMessage(response.data.message);
			})
			.catch(function (error) {
				setMessage(error.response.data.message);
			});
	};

	return (
		<div className={style.AccountSettings__panel}>
			<h4>Личные данные</h4>
			{[
				{ id: "name", label: "Имя", value: newValues.name },
				{ id: "email", label: "Почта", value: newValues.email },
				{ id: "phone", label: "Телефон", value: newValues.phone },
				{ id: "telegram", label: "Телеграм", value: newValues.telegram },
			].map((setting) => (
				<div className={style.AccountSettings__inputBox}>
					<span className={style.AccountSettings__inputBox__label}>{setting.label}</span>
					{setting.id == 'phone' ? (
						<InputPhone
							name={setting.id}
							value={setting.value}
							onChange={(e) => changePhone(e)}
							placeholder={`${setting.label}`}
							country="RU"
							international
							withCountryCallingCode
							readOnly
						/>
					) : (
						<input
							name={setting.id}
							value={setting.value}
							onChange={handleChangeInputVal}
							placeholder={`${setting.label}`}
							readOnly
						/>
					)}
					<span
						id={setting.id}
						className={style.AccountSettings__inputBox__change}
						onClick={() => handleChangeValue(setting.id)}
					>Изменить</span>
				</div>
			))}
			<span style={{ color: 'white' }}>{message}</span>
			<div className={style.AccountSettings__inputBox + ' txt-center'}>
				<p className="spacer"></p>
				<button
					id="saveChangesAccount"
					onClick={handleSendRequest}
					className={style.AccountSettings__inputBox__submit + ' ' + style.AccountSettings__disabled}
				>Сохранить</button>
			</div>
		</div>
	);
}
