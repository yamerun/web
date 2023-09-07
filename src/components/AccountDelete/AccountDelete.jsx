import React, { useState } from "react";
import style from "./AccountDelete.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { AccountDeletePopup } from "./AccountDeletePopup";

export default function AccountDelete() {
	const [isModal, setModal] = useState(false);

	return (
		<div className={style.AccountDelete__panel}>
			<h4>Удаление аккаунта</h4>
			<div className={style.AccountDelete__inputBox + ' m-unbottom'}>
				<span className={style.AccountDelete__inputBox__label}>Вместе с аккаунтом все ваши данные будут удалены.</span>
				<div className={style.AccountDelete__delete}>
					<button
						className={style.AccountDelete__delete__link}
						onClick={() => setModal(true)}
					>
						Удалить аккаунт</button>
				</div>
			</div>
			<AccountDeletePopup
				isVisible={isModal}
				onClose={() => setModal(false)}
			/>
		</div>
	);
}