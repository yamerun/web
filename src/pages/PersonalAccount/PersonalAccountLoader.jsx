import React from "react";
import style from "./PersonalAccount.module.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserRole } from "../../store/userAccountSlice/AccountSlice";
const AccountNavigation = React.lazy(() => import('../../components/PersonalAccountNavigation/AccountNavigation'));
const Partners = React.lazy(() => import('../../components/Partners/Partners'));
// const AccountSettings = React.lazy(() => import('../AccountSettings/AccountSettings'));
export const AccountPageLoader = async ({ params }) => {
	const key = localStorage.getItem("jwt");
	if (key) {
		const res = await fetch(`https://change.pro/api/user/get`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		const item = await res.json();
		const navset = params.navset;
		localStorage.setItem("userRole", item.data.role.code);
		if (item.data.role.code !== null && item.data.role.code === "exchanger") {
			localStorage.setItem("userId", item.data.role.id);
		} else {
			localStorage.setItem("userId", item.data.id);
		}

		return { item, navset };
	} else window.location.href = "/changePro";
};

export const PersonalAccountLoader = () => {
	const dispatch = useDispatch();
	const { item, navset } = useLoaderData();
	const role = localStorage.getItem("userRole");
	const jwt = localStorage.getItem("jwt");

	useEffect(() => {
		if (jwt && role !== null && role === "exchanger") {
			dispatch(setUserRole(true));
		} else dispatch(setUserRole(false));
	}, [jwt, role]);

	let AccountSection = '';
	switch (navset) {
		case 'reviews':
			AccountSection = React.lazy(() => import('../AccountReviews/AccountReviews'));
			break;
		case 'favoriteexchangers':
			AccountSection = React.lazy(() => import('../FavoriteExchangers/FavoriteExchangers'));
			break;
		default:
			AccountSection = React.lazy(() => import('../AccountSettings/AccountSettings'));
			break;
	}

	return (
		<div className={'section-wrapper'}>
			<div className={'container-full'}>
				<div className="row">
					<sidebar className={'col-md-4 col-lg-3'}>
						<div className="block">
							<React.Suspense fallback={<h6>...loading</h6>}>
								<AccountNavigation item={item} />
							</React.Suspense>
						</div>
					</sidebar>
					<main className={style.PersonalAccount__main + ' col-md-8 col-lg-9'}>
						<div className="block">
							<React.Suspense fallback={<h6>...loading</h6>}>
								<AccountSection item={item} />
							</React.Suspense>
						</div>
					</main>
				</div>
				<React.Suspense fallback={<h6>...loading</h6>}>
					<Partners />
				</React.Suspense>
			</div>
		</div>
	);
};