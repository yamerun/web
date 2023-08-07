import React, { useEffect } from "react";
import style from "./ExchangerNotifications.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ExchangerNotifications = () => {
	const navigate = useNavigate();
	const { isExchangerRole } = useSelector((state) => ({
		isExchangerRole: state.AccountSlice.isExchangerRole,
	}));
	const role = localStorage.getItem("userRole");
	const jwt = localStorage.getItem("jwt");
	const [types, setTypes] = React.useState([]);
	const [user, setUser] = React.useState([]);
	useEffect(() => {
		if (isExchangerRole === false) {
			navigate("/changePro");
		}
	}, [isExchangerRole]);

	useEffect(() => {
		axios
			.get(`https://change.pro/api/user/notifications/get_types`)
			.then(function (response) {
				setTypes(response.data.data);
			});
	}, []);

	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			"Content-Type": "application/json",
		},
	};

	const changeNotflication = ({ id }) => {
		axios
			.post(
				`https://change.pro/api/user/notifications/toggle_type`,
				{
					type_id: id,
				},
				config
			)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get(`https://change.pro/api/user/get`, config)
			.then(function (response) {
				setUser(response.data.data);
			});
	}, []);

	const togglePoint = ({ id }) => {
		axios.post(
			`https://change.pro/api/user/notifications/toggle_point`,
			{
				contact_type: id,
			},
			config
		);
	};

	return (
		<div className={style.Notifications}>
			<div className={style.Notifications__container}>
				<h1 className={style.Notifications__container__header}>
					Настройка уведомлений
				</h1>
				<div className={style.Notifications__container__options}>
					<div className={style.Notifications__container__options__box}>
						<h1
							className={style.Notifications__container__options__box__header}
						>
							Отправлять уведомления:
						</h1>
						<div className={style.switchCheckBox}>
							<div className={style.switchCheckBox__container}>
								<div className={style.switch}>
									<input
										type="checkbox"
										id="email"
										onClick={(e) => togglePoint(e.target)}
									/>
									<label htmlFor="email"></label>
								</div>

								<h1 className={style.switchCheckBox__container__header}>
									{" "}
									E-mail: {user.email}
								</h1>
							</div>
							<div className={style.switchCheckBox__container}>
								<div className={style.switch}>
									<input
										type="checkbox"
										id="telegram"
										onClick={(e) => togglePoint(e.target)}
									/>
									<label htmlFor="telegram"></label>
								</div>

								<h1 className={style.switchCheckBox__container__header}>
									Telegram: {user.telegram}
								</h1>
							</div>
						</div>
						<h1
							className={style.Notifications__container__options__box__header2}
						>
							Уведомления в Telegram-группе →
						</h1>
					</div>
					<div className={style.Notifications__container__options__box2}>
						<h1
							className={style.Notifications__container__options__box__header}
						>
							Включите тип уведомлений:
						</h1>
						<div className={style.switchCheckBox}>
							{types.map((item) => (
								<div className={style.switchCheckBox__container}>
									<div className={style.switch}>
										<input
											type="checkbox"
											id={item.id}
											onClick={(e) => changeNotflication(e.target)}
										/>
										<label for={item.id}></label>
									</div>
									<h1 className={style.switchCheckBox__container__header}>
										{item.name}
									</h1>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

/*          <button className={style.Notifications__container__btn}>
		  Сохранить
		</button>            <div className={style.switchCheckBox__container}>
				<div className={style.switch}>
				  <input type="checkbox" id="switch3" />
				  <label htmlFor="switch3"></label>
				</div>

				<h1 className={style.switchCheckBox__container__header}>
				  {" "}
				  О недоступности экспортного файла курсов
				</h1>
			  </div>

			  <div className={style.switchCheckBox__container}>
				<div className={style.switch}>
				  <input type="checkbox" id="switch4" />
				  <label htmlFor="switch4"></label>
				</div>

				<h1 className={style.switchCheckBox__container__header}>
				  О новых отзывах
				</h1>
			  </div>
			  <div className={style.switchCheckBox__container}>
				<div className={style.switch}>
				  <input type="checkbox" id="switch5" />
				  <label htmlFor="switch5"></label>
				</div>

				<h1 className={style.switchCheckBox__container__header}>
				  О новых комментариях к отзывам
				</h1>
			  </div>
			  <div className={style.switchCheckBox__container}>
				<div className={style.switch}>
				  <input type="checkbox" id="switch6" />
				  <label htmlFor="switch6"></label>
				</div>

				<h1 className={style.switchCheckBox__container__header}>
				  О новых комментариях к отзывам
				</h1>
			  </div>*/
