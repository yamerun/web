import React from "react";
import style from "./AccountDelete.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AccountDelete() {
	const [message, setMessage] = React.useState('');
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
		},
	};
	const DeleteAccount = () => {
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
		<div className={style.AccountDelete__panel}>
			<h4>Удаление аккаунта</h4>
			<div className={style.AccountDelete__inputBox + ' m-unbottom'}>
				<span className={style.AccountDelete__inputBox__label}>Вместе с аккаунтом все ваши данные будут удалены.</span>
				<div className={style.AccountDelete__delete}>
					<Link
						className={style.AccountDelete__delete__link}
						to="">
						Удалить аккаунт</Link>
				</div>
			</div>
		</div >
	);
}