import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Popup.module.scss";
import img from "../../assets/imgs/registrationCat.png";

export const RegistrationPopup = ({ isVisible = false, type = 'user', onClose }) => {
	const [content, setContent] = useState('');
	const keydownHandler = ({ key }) => {
		switch (key) {
			case 'Escape':
				onClose();
				break;
			default:
		}
	};

	useEffect(() => {
		switch (type) {
			case 'exchanger':

				break;
			default:
				setContent('<h4>Аккаунт успешно создан</h4><p>На Ваш E-mail отправлен код подтверждения.</p><p>После подтверждения модерация займет до 1 рабочего дня. После прохождения модерации доступ к аккаунту будет предоставлен.</p>');
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
					<img src={img} alt="Ok" className={style.Popup__thumb} />
					<div className={style.Popup__content} dangerouslySetInnerHTML={{ __html: content }}></div>
					<div className={style.Popup__footer}>
						<Link className={style.Popup__gotoaccount}>Перейти в Личный кабинет</Link>
						<Link className={style.Popup__gotohome}>На Главную</Link>
					</div>

				</div>

			</div>
		</div >
	);
};