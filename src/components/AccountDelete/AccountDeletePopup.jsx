import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../RegistrationPopup/Popup.module.scss";
import img from "../../assets/imgs/registrationCat.png";

export const AccountDeletePopup = ({ isVisible = false, type = '', onClose }) => {
	const [content, setContent] = useState('');
	const [step, setStep] = useState(type);
	const [message, setMessage] = useState('');
	const DeleteAccount = () => {
		axios
			.post(
				"https://change.pro/api/user/block",
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			)
			.then(function (response) {
				setMessage(response.data.message);
				if (response.data?.success == true) {
					localStorage.removeItem("jwt");
					localStorage.removeItem("userId");
					localStorage.removeItem("userRole");
					setStep('confirm');
					setTimeout(function () {
						navigate("/");
					}, 10000);
				}
			}).catch(function (error) {
				setMessage(error.message);
			});
	};
	const keydownHandler = ({ key }) => {
		switch (key) {
			case 'Escape':
				onClose();
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		switch (step) {
			case 'confirm':
				setContent('<h4>Удаление аккаунта</h4><p>Аккаунт успешно удалён.</p>');
				break;
			default:
				setContent('<h4>Удаление аккаунта</h4><p>Подтвердите удаление аккаунта.</p>');
				break;
		}
	});

	useEffect(() => {
		document.addEventListener('keydown', keydownHandler);
		return () => document.removeEventListener('keydown', keydownHandler);
	});

	return !isVisible ? null : (
		<div className={style.Popup + ' ' + style.open} onClick={onClose}>
			<div className={style.Popup__wrapper} onClick={e => e.stopPropagation()}>
				<div className={style.Popup__body}>
					<span className={style.Popup__close} onClick={onClose}></span>
					<div className={style.Popup__content} dangerouslySetInnerHTML={{ __html: content }}></div>
					<span style={{ color: 'white' }}>{message}</span>
					<div className={style.Popup__footer}>
						{step == 'confirm' ?
							<Link className={style.Popup__gotohome} to="/">На Главную</Link> :
							<button className={style.Popup__gotoaccount} onClick={DeleteAccount}>Подтвердить</button>
						}
					</div>
				</div>
			</div>
		</div >
	);
};