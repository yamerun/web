import React from "react";
import style from "./Header.module.scss";
import logo from "../../assets/imgs/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const HeaderRoutes = React.lazy(() =>
	import("./HeaderNavigationRoutes/HeaderNavigationRoutes")
);
export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const goToMain = () => {
		const homePage = "/changePro";
		if (location.pathname != homePage) {
			navigate(homePage);
		}
	};
	const [active, setActive] = React.useState(false);
	const [screenSize, getDimension] = React.useState({
		dynamicWidth: window.innerWidth,
		dynamicHeight: window.innerHeight,
	});

	const goToAccount = () => {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		};
		axios
			.get(`https://change.pro/api/user/get`, config)
			.then(function (response) {
				navigate("/account");
			})
			.catch(function (error) {
				if (error) {
					navigate("/login");
				}
			});
	};
	const jwt = localStorage.getItem("jwt");
	const setDimension = () => {
		getDimension({
			dynamicWidth: window.innerWidth,
			dynamicHeight: window.innerHeight,
		});
	};

	React.useEffect(() => {
		window.addEventListener("resize", setDimension);
		return () => {
			window.removeEventListener("resize", setDimension);
		};
	}, [screenSize]);

	const ShowOrHideMenu = () => {
		if (screenSize.dynamicWidth < 900) {
			setActive(!active);
		}
	};

	return (
		<header className={style.Header}>
			<div className="container-full">
				<div className={style.Header__menu + ' row'}>
					<div className={style.Header__menu__logo__wrapper + ' col-xl-3'}>
						<div className="block">
							{screenSize.dynamicWidth < 900 && (
								<button onClick={ShowOrHideMenu} className={style.Btn} />
							)}
							<img
								className={style.Header__menu__logo}
								src={logo}
								alt="logo"
								onClick={() => goToMain()}
							/>
						</div>
					</div>

					{active === true && screenSize.dynamicWidth < 900 && (
						<>
							<React.Suspense fallback={<h1>...loading</h1>}>
								<HeaderRoutes />
							</React.Suspense>

							<button
								className={
									jwt === null
										? style.Header__menu__logInBtn
										: style.Header__menu__lc
								}
								onClick={goToAccount}
							>
								{jwt === null ? "Войти" : "Личный кабинет"}
							</button>
						</>
					)}
					{screenSize.dynamicWidth > 900 && (
						<>
							<React.Suspense fallback={<h1>...loading</h1>}>
								<HeaderRoutes />
							</React.Suspense>
							<div className={style.Header__menu__rightSide}>
								<button
									className={
										jwt === null
											? style.Header__menu__logInBtn
											: style.Header__menu__lc
									}
									onClick={goToAccount}
								>
									{jwt === null ? "Войти" : "Личный кабинет"}
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
