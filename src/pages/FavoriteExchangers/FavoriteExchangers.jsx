import React, { useRef, useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./FavoriteExchangers.module.scss";
import axios from "axios";
import { EmptyPlaceholder } from "../../components/EmptyPlaceholder/EmptyPlaceholder";

export const FavoriteExchangersLoader = async () => {
	const key = localStorage.getItem("jwt");
	if (key) {
		const res = await fetch(`https://change.pro/api/user/favorite/exchangers`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${key}`,
			},
		});
		const items = await res.json();
		return { items };
	} else window.location.href = "/changePro";
};

const ToggleToFavorite = React.lazy(() =>
	import("../../components/AddToFavorite/AddToFavorite")
);

const ImageComponent = React.lazy(() =>
	import("../../components/ImageComponent/Image")
);

export default function FavoriteExchangers() {
	const { items } = useLoaderData();
	const [favorites, setFavorites] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		};
		axios
			.get(`https://change.pro/api/user/favorite/exchangers`, config)
			.then(function (response) {
				if (response.data?.data) {
					console.log(response.data.data);
					dispatch(setFavorites(response.data.data));
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<div className={style.Favorite + ' row'}>
			{favorites.length ? (favorites.map((item) => (
				<div className="col-lg-4 col-sm-6">
					<div className="block">
						<div className={style.Favorite__item}>
							<div className={style.Favorite__item__header}>
								<div className={style.Favorite__item__title}>{item.name}</div>
								<ToggleToFavorite itemid={item.id} />
							</div>
							<Link to={`/exchanger/${item.id}`} className={style.Favorite__item__cover}>
								<div className="media-ratio">
									{Object.keys(item?.logo).length !== 0 ? (
										<React.Suspense
											fallback={
												<h6
													style={{
														color: "white",
														textAlign: "center",
														fontSize: "15px",
													}}
												>
													...Loading
												</h6>
											}
										>
											{" "}
											<ImageComponent imageInfo={item?.logo} />
										</React.Suspense>
									) : (
										<div></div>
									)}
								</div>
							</Link>
							<div className={style.Favorite__item__footer}>
								<Link to={item.site_url} className={style.Favorite__item__siteurl}>{item.site_url}</Link>
							</div>
						</div>
					</div>
				</div>
			))) : (
				<div className="col-12">
					<EmptyPlaceholder type={"favorites"} />
				</div>
			)}
		</div>
	);
};
