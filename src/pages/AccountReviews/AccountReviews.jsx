import React, { useRef, useEffect, useState } from "react";
import style from "./AccountReviews.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import { Comments } from "../../components/Comments/Comments";

export default function AccountReviews() {
	const { item } = useLoaderData();
	const key = localStorage.getItem("jwt");
	let id = localStorage.getItem("userId");
	const [reviews, setReviews] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		};
		if ((id == 'null' || !id) && item?.data?.id) {
			id = item.data.id;
		}
		if (id && key) {
			axios
				.get(`https://change.pro/api/reviews/get_by_author?author_id=${id}`, config)
				.then(function (response) {
					if (response.data?.data) {
						dispatch(setReviews(response.data.data));
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}, []);

	return (
		<div className={style.AccountReviews}>
			<div className={style.AccountReviews__container + ' row'}>
				{reviews != null ? (
					reviews.map((item) => (
						<Comments props={item} st={'blackbg'} />
					))
				) : (
					<div></div>
				)}
			</div>
			<div className={style.AccountReviews__pagination}></div>
		</div>
	);
};
