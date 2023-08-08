import React, { useState, useEffect, useRef } from "react";
import style from "./Notflications.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
export const Notflications = () => {
	var currentDate = new Date();
	const { currentFrom, currentTo, isFilltersClear } = useSelector((state) => ({
		currentFrom: state.itemsSlice.currentFrom,
		currentTo: state.itemsSlice.currentTo,
		isFilltersClear: state.itemsSlice.isFilltersClear,
	}));
	const [email, setEmail] = useState("");
	const [course, setCourse] = useState([]);
	const [outValue, setOutValue] = useState("");
	const [reserveValue, setReserveValue] = useState("");
	const [active, setActive] = useState(false);
	const [timeValue, setTimeValue] = useState("");
	const [timeTitle, setTimeTitle] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('')

	useEffect(() => {
		axios
			.get(
				`https://change.pro/api/exchangers/currencies/get?orderBy=out&sort=desc&limit=1&from=${currentFrom}&to=${currentTo}`
			)
			.then(function (response) {
				setCourse(response.data.data);

			}).catch(function (error) {

			})
	}, [currentFrom, currentTo]);

	const ChangeOutValue = (e) => {
		setOutValue(e.target.value);
	};

	const ChangeReserveValue = (e) => {
		setReserveValue(e.target.value);
	};
	const ChangeEmailValue = (e) => {
		setEmail(e.target.value);
	};

	const openSelect = () => {
		setActive(!active);
	};

	const changeDateTo6hourse = ({ textContent }) => {
		setTimeValue(currentDate.setHours(currentDate.getHours() + 6));
		setActive(false);
		setTimeTitle(textContent)
	};
	const changeDateTo12hourse = ({ textContent }) => {
		setTimeValue(currentDate.setHours(currentDate.getHours() + 12));
		setActive(false);
		setTimeTitle(textContent)
	};
	const changeDateTo24hourse = ({ textContent }) => {
		setTimeValue(currentDate.setHours(currentDate.getHours() + 24));
		setActive(false);
		setTimeTitle(textContent)
	};
	const changeDateTo1Weekhourse = ({ textContent }) => {
		setTimeValue(currentDate.setDate(currentDate.getDate() + 7));
		setActive(false);
		setTimeTitle(textContent)
	};
	const changeDateTo1Mounth = ({ textContent }) => {
		setTimeValue(currentDate.setMonth(currentDate.getMonth() + 1));
		setActive(false);
		setTimeTitle(textContent)
	};
	const changeDateTo3Mounth = ({ textContent }) => {
		setTimeValue(currentDate.setMonth(currentDate.getMonth() + 3));
		setActive(false);
		setTimeTitle(textContent)
	};

	const CreateNotflication = () => {
		axios
			.post(`https://change.pro/api/rate/notifications/create`, {
				from: currentFrom,
				to: currentTo,
				min_value: outValue === "" ? Math.floor(course[0].out) : outValue,
				amount: reserveValue === "" ? Math.floor(course[0].amount) : reserveValue,
				date_expiration: timeValue,
				contact: email,
				contact_type: "email",
			})
			.then(function (response) {
				setError('');
				setSuccess(`Уведомоление отправлено на ${email}`)
			}).catch(function (error) {
				setError(error.response.data.message);
				setSuccess('')
			})
	};

	return (
		<div className={style.FormFilter + ' row'}>
			<div className="col-lg-1">
				<div className={style.FormFilter__item + ' d-sm-none'}>
					<h3 className="txt-center m-unbottom">Получить уведомление<br />об изменении курса по E-mail <abbr className={style.FormFilter__policy} title="условия">*</abbr></h3>
				</div>
			</div>
			<div className={'col-lg-2 ' + style.FormFilter__wrapper}>
				<label className={style.FormFilter__item} htmlFor="">
					<span className={style.FormFilter__label__text}>E-mail</span>{" "}
					<input
						type="email"
						className={style.FormFilter__item__input}
						onChange={(e) => ChangeEmailValue(e)} />
				</label>
				<label className={style.FormFilter__item} htmlFor="">
					<span className={style.FormFilter__label__text}>Сброс заявки через</span>{" "}
					<div className={style.Notflication__row}>
						<div className={style.FormFilter__item__input} onClick={openSelect}>{timeTitle !== '' ? `${timeTitle}` : 'Выбрать'}</div>
						{active && (
							<nav className={style.Notflication__timevariants}>
								<ul>
									<li onClick={(e) => changeDateTo6hourse(e.target)}>6 часов</li>
									<li onClick={(e) => changeDateTo12hourse(e.target)}>12 часов</li>
									<li onClick={(e) => changeDateTo24hourse(e.target)}>24 часа</li>
									<li onClick={(e) => changeDateTo1Weekhourse(e.target)}>Неделя</li>
									<li onClick={(e) => changeDateTo1Mounth(e.target)}>Месяц</li>
									<li onClick={(e) => changeDateTo3Mounth(e.target)}>3 месяца</li>
								</ul>
							</nav>
						)}
					</div>
				</label>
			</div>
			<div className={'col-lg-4 ' + style.FormFilter__wrapper}>
				<label className={style.FormFilter__item} htmlFor="">
					<span className={style.FormFilter__label__text}>Обмен курсом менее</span>
					<input
						className={style.FormFilter__item__input + ' ' + style.FormFilter__item__input__half}
						placeholder={course.length !== 0 && Math.floor(course[0].out)}
						onChange={(e) => ChangeOutValue(e)}
						type="numeric"
						min="0"
					/>
					<span className={style.FormFilter__label__current}>{currentTo} за 1 {currentFrom}</span>
				</label>
				<label className={style.FormFilter__item} htmlFor="">
					<span className={style.FormFilter__label__text}>Резерв не менее</span>
					<input
						className={style.FormFilter__item__input + ' ' + style.FormFilter__item__input__half}
						onChange={(e) => ChangeReserveValue(e)}
						placeholder={course.length !== 0 && Math.floor(course[0].amount)}
					/>
				</label>
			</div>

			<div className="col-lg-3">
				<div className={style.FormFilter__item}>
					<h3 className="d-sm-block">Получить уведомление об изменении курса по E-mail <abbr className={style.FormFilter__policy} title="условия">*</abbr></h3>
					<button className={style.FormFilter__item__btn} onClick={CreateNotflication}>Отправить заявку</button>
					<div className={style.FormFilter__policy__text + ' txt-sm-center'}>
						<span className={style.FormFilter__policy}>*</span> Я принимаю «<Link to="/">Условия пользовательского соглашения и Политики конфиденциальности</Link>»
					</div>
					{error !== '' ? (<div className={style.Notflication__error}>{error}</div>) : (<div className={style.Notflication__success}>{success}</div>)}
				</div>
			</div>
			<div className="col-lg-2"></div>
		</div>
	);
};
