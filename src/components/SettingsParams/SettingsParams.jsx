import React from "react";
import style from "./SettingParams.module.scss";
import img from "../../assets/imgs/settings.svg";
import axios from "axios";
import PropTypes from "prop-types";

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
		document.querySelector(`.${style.AccountSettings__inputBox__submit}`).removeAttribute('disabled');
	};

	const handleSendRequest = () => {
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
					<input
						name={setting.id}
						value={setting.value}
						onChange={handleChangeInputVal}
						placeholder={`${setting.label}`}
						readOnly
					/>
					<span
						id={setting.id}
						className={style.AccountSettings__inputBox__change}
						onClick={() => handleChangeValue(setting.id)}
					>Изменить</span>
				</div>
			))}
			<span>{message}</span>
			<div className={style.AccountSettings__inputBox + ' txt-center'}>
				<p className="spacer"></p>
				<button
					onClick={handleSendRequest}
					className={style.AccountSettings__inputBox__submit}
					disabled
				>Сохранить</button>
			</div>
		</div>
	);
}
