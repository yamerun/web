import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./AddComment.module.scss";
import axios from "axios";
import { PrivacyPolicyLink } from "../PrivacyPolicyLink/PrivacyPolicyLink";

export default function AddComment({ HideReviews, id, name, review, }) {
	const Register = () => {
		axios
			.post(
				`https://change.pro/api/reviews/create`,
				{
					comment: textVal,
					rating: rating,
					exchanger_id: id,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			)
			.then(function (response) {
				console.log(response);
				HideReviews();
			})
			.catch(function (error) {
				setError(error.message);
			});
	};

	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [error, setError] = useState("");
	const [textVal, setTextVal] = useState("");

	const setInputsValue = (e) => {
		setTextVal(e.target.value);
	};

	return (
		<div className={style.AddComment + ' col-12'}>
			<div className="block">
				<div className={style.AddComment__form + ' ' + style.formReviews}>
					<label className={style.formReviews__inputBox}>
						<h3>Добавить отзыв об обменном пункте</h3>
					</label>
					<div className={style.formReviews__inputBox}>
						<span className={style.formReviews__inputBox__label}>Оценка обменного пункта:</span>
						{[...Array(5)].map((star, index) => {
							index += 1;
							return (
								<button
									type="button"
									key={index}
									className={
										index <= rating ? `${style.star__on}` : `${style.star__off}`
									}
									onClick={() => setRating(index)}

								>
									<span className={style.star}>&#9733;</span>
								</button>
							);
						})}
					</div>
					<label className={style.formReviews__inputBox}>
						<span className={style.formReviews__inputBox__label}>Ваше имя <abbr title="обязательно">*</abbr></span>
						<input
							required
							name="name"
							id="name"
							type="text"
							placeholder="Введите имя"
							onChange={(e) => setInputsValue(e)}
						/>
					</label>
					<label className={style.formReviews__inputBox}>
						<span className={style.formReviews__inputBox__label}>Ваше E-mail <abbr title="обязательно">*</abbr></span>
						<input
							required
							name="email"
							id="email"
							type="email"
							placeholder="Введите E-mail"
							onChange={(e) => setInputsValue(e)}
						/>
					</label>
					<label className={style.formReviews__inputBox}>
						<span className={style.formReviews__inputBox__label}>Текст отзыва <abbr title="обязательно">*</abbr></span>
						<textarea
							rows="8"
							placeholder="Введите текст отзыва..."
							onChange={(e) => setInputsValue(e)}
						></textarea>
					</label>
					<label className={style.formReviews__inputBox}>
						<span className={style.formReviews__inputBox__label}>Номер обмена (заявки) <abbr title="обязательно">*</abbr></span>
						<input
							required
							name="application_number"
							id="application_number"
							type="text"
							placeholder="Введите номер"
							onChange={(e) => setInputsValue(e)}
						/>
					</label>
					<div className={style.formReviews__inputBox}>
						<span className={style.formReviews__inputBox__label}>Тип отзыва <abbr title="обязательно">*</abbr></span>
						<div className={style.formReviews__inputBox__list}>
							<label className="d-flex">
								<input
									checked
									required
									type="radio"
									name="pretension"
									value="0"
									className={style.formReviews__inputBox__radio}
									onChange={(e) => setInputsValue(e)}
								/>
								<span></span>
								<span className={style.formReviews__inputBox__radio__text}>Отзыв</span>
							</label>
							<label className="d-flex">
								<input
									required
									type="radio"
									name="pretension"
									value="1"
									className={style.formReviews__inputBox__radio}
									onChange={(e) => setInputsValue(e)}
								/>
								<span></span>
								<span className={style.formReviews__inputBox__radio__text}>Претензия</span>
							</label>
						</div>
					</div>
					<div className={style.formReviews__inputBox + ' txt-center'}>
						<div className={style.formReviews__subtext + ' txt-left m-untop'}>
							<p>Используйте этот тип отзыва только в случае, если вы до сих пор не получили средства от обменника, а положенный срок уже прошел. После получения средств по обмену либо возврата претензия должна быть снята.</p>
							<p>При этом обязательно укажите ваш номер обмена (заявки) – это поможет администратору Обменника скорее решить проблему.</p>
							<p>Если вам просто не понравилось обслуживание в {name} и вы хотите написать об этом – выберите тип отзыва "Отзыв"</p>
						</div>
						<span style={{ color: "white" }}>{error}</span>
						<button onClick={Register} className={style.formReviews__btn}>
							Оставить отзыв
						</button>
						<div className={style.formReviews__subtext}>
							<p>Нажав «Оставить отзыв», я принимаю «<PrivacyPolicyLink />»</p>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};
