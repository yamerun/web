import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { Like } from "../Like/Like";
import { Dislike } from "../Dislike/Dislike";
import axios from "axios";
import style from "./ChildComments.module.scss";

export const ChildComments = ({ props }) => {
	const [like, setLike] = useState(false);
	const [dislike, setDislike] = useState(false);
	useEffect(() => {
		const isLike = localStorage.getItem(`isLike${props.id}`);
		const isDislike = localStorage.getItem(`isDislike${props.id}`);
		if (isLike === "true") {
			setLike(true);
		} else if (isDislike === "true") {
			setDislike(true);
		}
	}, [props.id]);

	const RateLike = () => {
		axios
			.post(
				"https://change.pro/api/reviews/like",
				{
					review_id: props.id,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			)
			.then(function (response) {
				setLike(true);
				setDislike(false);
			})
			.catch(function (error) {
				setErr(err);
			});
	};

	const RateDisLike = () => {
		axios
			.post(
				"https://change.pro/api/reviews/dislike",
				{
					review_id: props.id,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			)
			.then(function (response) {
				setLike(false);
				setDislike(true);
			});
	};

	return (
		<div className={style.ChildComments__item}>
			<div className={style.ChildComments__header}>
				<div className={style.ChildComments__user}>
					<h4 className={style.ChildComments__user__name}>{props.author.name}</h4>
					<div style={{ display: 'none' }}>
						<StarRatings
							rating={props.rating}
							starRatedColor="#df3c3c"
							numberOfStars={5}
							name="rating"
							starDimension="16px"
							starSpacing="2px"
						/>
					</div>
				</div>
				<time className={style.ChildComments__user__createdAt}>{props.created_at}</time>
			</div>
			<div className={style.ChildComments__textBox}>
				<p className={style.ChildComments__textBox__text}>{props.comment}</p>
			</div>
			<div className={style.ChildComments__footer}>
				<div className={style.ChildComments__likeOrDislike}>
					<button
						onClick={RateLike}
						className={style.ChildComments__likeOrDislike__btn}
					>
						<Like />
						<p>{props.likes}</p>
					</button>
					<button
						onClick={RateDisLike}
						className={style.ChildComments__likeOrDislike__btn}
					>
						<Dislike />
						<p>{props.dislikes}</p>
					</button>
				</div>
			</div>
		</div>
	);
};
