import React, { useEffect, useState, useRef, useCallback } from "react";
import style from "./forPartners.module.scss";
import { useSelector } from "react-redux";

import { SearchMenu } from "../../components/SearchMenu/SearchMenu";

import axios from "axios";

export const ForPartners = () => {
	const [data, setData] = useState("");
	const [form, setForm] = useState([]);
	const [formData, setFormData] = useState([]);
	const [finalRes, setFinalRes] = useState([]);
	const [formId, setFormId] = useState(null);
	const { isExchangerRole } = useSelector((state) => ({
		isExchangerRole: state.AccountSlice.isExchangerRole,
	}));
	const ref = useRef(null);
	useEffect(() => {
		axios
			.get(`https://change.pro/api/content/page_partners`)
			.then(function (response) {
				setData(response.data.data.description);
			});
	}, []);

	useEffect(() => {
		axios
			.get(`https://change.pro/api/forms/get?page=forPartners`)
			.then(function (response) {
				setForm(response.data.data);
			});
	}, []);

	const sendForm = (id) => {
		setFinalRes(formData.filter((obj) => obj.form_id == id));
		setFormId(id);
	};

	useEffect(() => {
		if (finalRes.length === 0) {
			return;
		}
		axios
			.post("https://change.pro/api/forms/set", {
				form_id: formId,
				result: finalRes.map((item) => ({
					field_id: item.id,
					field_value: item.value,
				})),
			})
			.then(function (response) { });
	}, [finalRes, formId]);

	const changeInputVal = (e) => {
		let id = e.target.id;
		let value = e.target.value;
		let formsId = e.target.parentNode.id;
		setFormData((prevState) => {
			const index = prevState.findIndex((obj) => obj.id === id);
			if (index === -1) {
				return [...prevState, { form_id: formsId, value: value, id: id }];
			} else {
				return [
					...prevState.slice(0, index),
					{ form_id: formsId, value: value, id: id },
					...prevState.slice(index + 1),
				];
			}
		});
	};

	function createMarkup(content) {
		return { __html: `${content}` };
	}

	return (
		<div className={'section-wrapper ' + style.forPartners}>
			<div className={'container-full'}>
				<div className="row">
					<SearchMenu />
					<main className={'col-md-8 col-lg-9'}>
						<div className="block">
							<div className={style.forPartners__headerbox}>
							</div>
							<div className={style.forPartners__container}>
								<div className={style.forPartners__textbox}>
									<div className={style.forPartners__textbox__text} dangerouslySetInnerHTML={createMarkup(data)}></div>
								</div>
								{form.length != 0 &&
									form.map((item) => (
										<div className={style.forPartners__form} id={item.id}>
											<button
												className={style.forPartners__form__btn}
												onClick={() => sendForm(item.id)}
											>
												{item.button_title}
											</button>
											{item.fields.map((item) => (
												<input
													required={item.is_required}
													id={item.id}
													placeholder={item.name}
													className={style.forPartners__form__input}
													onChange={(e) => changeInputVal(e)}
												/>
											))}
										</div>
									))}
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};
