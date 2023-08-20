import React from "react";
import style from "./ExchangerAccountNavigation.module.scss";
import { NavLink } from "react-router-dom";
export const ExchangerAccountNavigation = () => {

	// Выбор активного элемента меню
	const setCurrentNavigate = ({ isActive }) => (isActive ? (`${style.exchangerNavigation__itemsList__item}` + ' ' + `${style.active}`) : `${style.exchangerNavigation__itemsList__item}`);

	return (
		<div className={style.exchangerNavigation__section + ' section-wrapper'}>
			<div className="container-full">
				<div className="row">
					<div className="col-lg-3 col-md-4"></div>
					<div className="col-lg-9 col-md-8">
						<nav className={style.exchangerNavigation}>
							<ul className={style.exchangerNavigation__itemsList}>
								<li>
									<NavLink
										className={setCurrentNavigate}
										to={`/exchanger/info`}
									>
										Информация
									</NavLink>
								</li>
								<li>
									<NavLink
										className={setCurrentNavigate}
										to="/exchanger/reviews"
									>
										Отзывы
									</NavLink>
								</li>
								<li>
									<NavLink
										className={setCurrentNavigate}
										to="/exchanger/courses"
									>
										Курсы
									</NavLink>
								</li>
								<li>
									<NavLink
										className={setCurrentNavigate}
										to="/exchanger/marks"
									>
										Метки
									</NavLink>
								</li>
								<li>
									<NavLink
										className={setCurrentNavigate}
										to="/exchanger/notifications"
									>
										Уведомления
									</NavLink>
								</li>
								<li>
									<NavLink
										className={setCurrentNavigate}
										to="/exchanger/scammers"
									>
										Мошенники
									</NavLink>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};
