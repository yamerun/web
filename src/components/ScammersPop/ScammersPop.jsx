import React, { useState } from "react";
import axios from "axios";
import style from "./ScammersPop.module.scss";
import { useCallback } from "react";

export const ScammersPop = ({ props, setUpdate }) => {
	const [name, setName] = useState("");
	const [contacts, setContacts] = useState("");
	const [walletId, setWalletId] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");
	const [variants, setVariants] = useState([]);
	const [active, setActive] = useState(false);

	const changeName = (e) => {
		setName(e.target.value);
	};

	const changeContacts = (e) => {
		setContacts(e.target.value);
	};
	const changeWalletId = (e) => {
		setWalletId(e.target.value);
	};
	const changeDescription = (e) => {
		setDescription(e.target.value);
	};

	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			"Content-Type": "application/json",
		},
	};

	const data = {
		scam_name: name,
		scam_email: contacts,
		scam_wallet: walletId,
		scam_type_id: type,
		scam_description: description,
	};

	const sendNewScamInfo = () => {
		axios
			.post(`https://change.pro/api/scammers/create`, data, config)
			.then(function (response) {
				setUpdate(true);
				props(false);
			});
	};
	const changeType = (e) => {
		setType(e.target.id);
		setActive(false);
	};

	const getSelectVariants = () => {
		axios
			.get(`https://change.pro/api/scammers/types`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			})
			.then(function (response) {
				setVariants(response.data.data);
			});
		setActive(!active);
	};

	const close = useCallback(() => {
		props(false);
	}, []);

	return (
		<div className={style.Modal} style={{ height: `${window.outerHeight}` }}>
			<div className={style.Modal__container}>
				<div className={style.Modal__container__header}>
					<h4 className={style.Modal__container__header__tittle}>
						Новая запись
					</h4>
					<button
						className={style.Modal__container__header__btn}
						onClick={close}
					></button>
				</div>
				<div className={style.Modal__container__inputMenu}>
					<div className={style.Modal__container__inputBox}>
						<label>Имя</label>
						<input
							className={style.Modal__container__inputBox__input}
							onChange={(e) => changeName(e)}
						/>
					</div>
					<div className={style.Modal__container__inputBox}>
						<label>Email</label>
						<input
							className={style.Modal__container__inputBox__input}
							onChange={(e) => changeContacts(e)}
						/>
					</div>
					<div className={style.Modal__container__inputBox}>
						<label>Кошелек</label>
						<input
							className={style.Modal__container__inputBox__input}
							onChange={(e) => changeWalletId(e)}
						/>
					</div>

					<div className={style.Modal__container__inputBox}>
						<label>Тип</label>
						<div
							onClick={getSelectVariants}
							className={style.Modal__container__inputBox__input}
						>
							{type}
						</div>
						{active && (
							<ul className={style.Modal__variants}>
								{variants.map((item) => (
									<li onClick={(e) => changeType(e)} key={item.id} id={item.id}>
										{item.type}
									</li>
								))}
							</ul>
						)}
					</div>
					<div className={style.Modal__container__inputBox}>
						<label>Описание</label>
						<textarea
							className={style.Modal__container__inputBox__textarea}
							onChange={(e) => changeDescription(e)}
						/>
					</div>
					<button
						className={style.Modal__container__btn}
						onClick={sendNewScamInfo}
					>
						Создать
					</button>
				</div>
			</div>
		</div>
	);
};
