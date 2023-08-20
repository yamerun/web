import { Link, NavLink } from "react-router-dom";
import style from "./HeaderRoutes.module.scss";
export default function HeaderNavigationRoutes() {
	const setActiveRoute = (e) => {
		e.target.classList.add(`${style.active}`);
		const buttons = document.querySelectorAll(`.${style.Buttons__btn}`);
		for (i of buttons) {
			if (i != e.target) {
				i.classList.remove(`${style.active}`);
			}
		}
	};

	{/* Выбор активного элемента меню */ }
	const setCurrentMenu = ({ isActive }) => (isActive ? (`${style.Buttons__btn}` + ' ' + `${style.active}`) : `${style.Buttons__btn}`);
	return (
		<ul className={style.Buttons}>
			<li>
				<NavLink
					className={setCurrentMenu}
					to="/changePro"
					onClick={(e) => setActiveRoute(e)}
				>
					Главная
				</NavLink>
			</li>
			<li>
				<NavLink
					className={setCurrentMenu}
					to="/exchangers"
					onClick={(e) => setActiveRoute(e)}
				>
					Обменники
				</NavLink>
			</li>
			<li>
				<NavLink
					className={setCurrentMenu}
					to="/partners"
					onClick={(e) => setActiveRoute(e)}
				>
					Партнерам
				</NavLink>
			</li>
			<li>
				<NavLink
					className={setCurrentMenu}
					to="/help"
					onClick={(e) => setActiveRoute(e)}
				>
					Помощь
				</NavLink>
			</li>
			<li>
				<NavLink
					className={setCurrentMenu}
					to="/articles"
					onClick={(e) => setActiveRoute(e)}
				>
					Статьи
				</NavLink>
			</li>
		</ul>
	);
}
