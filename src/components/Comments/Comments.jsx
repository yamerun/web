import React, { useEffect, useState } from "react";
import style from "./Comments.module.scss";
import StarRatings from "react-star-ratings";
import { Like, LikeFill } from "../Like/Like";
import { Dislike, DislikeFill } from "../Dislike/Dislike";
import axios from "axios";
import { ChildComments } from "../ChildComments/ChildComments";

export const Comments = ({ props, review, w = '100%', st = '' }) => {
	const [like, setLike] = useState(false);
	const [dislike, setDislike] = useState(false);
	const [active, setActive] = useState(false);
	const [openCommentAdd, setOpenCommentAdd] = useState(false);
	const [commentVal, setCommentVal] = useState("");
	const [error, setError] = useState("");
	const [rating, setRating] = useState("");

	useEffect(() => {
		const isLike = localStorage.getItem(`isLike${props.id}`);
		const isDislike = localStorage.getItem(`isDislike${props.id}`);
		if (isLike === "true") {
			setLike(true);
		} else if (isDislike === "true") {
			setDislike(true);
		}
	}, [props.id]);

	const OpenChildComments = () => {
		if (props.child_reviews != undefined) {
			setActive(!active);
		}
	};

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
			.catch(function (error) { });
	};

	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			"Content-Type": "application/json",
		},
	};

	const RateDisLike = () => {
		axios
			.post(
				"https://change.pro/api/reviews/dislike",
				{
					review_id: props.id,
				},
				config
			)
			.then(function (response) {
				setLike(false);
				setDislike(true);
			});
	};

	const opentCommentAddField = () => {
		setOpenCommentAdd(!openCommentAdd);
	};

	const changeCommentVal = (e) => {
		setCommentVal(e.target.value);
	};

	function getDatePublic({ created_at }) {
		created_at = created_at.split(' ');
		const date = created_at[0].split('.').reverse().join('-') + 'T' + created_at[1];
		const foramatteDate = new Date(date);
		return foramatteDate.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
			.replace(' г.', '')
			.replace(' в ', ', ');
	}

	const addChildComment = () => {
		axios
			.post(
				`https://change.pro/api/reviews/create`,
				{
					comment: commentVal,
					rating: rating,
					exchanger_id: props.exchanger_id,
					parent_id: props.id,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				setError(error.message);
			});
	};


	return (
		<div className="col-lg-4">
			<div className={style.Review + ' ' + st + ' block'}>
				<div className={style.Review__content}>
					<div className={style.Review__header}>
						<div className={style.Review__user}>
							<h3 className={style.Review__user__name}>{props.author.name}</h3>
							<StarRatings
								rating={props.rating}
								starRatedColor="#df3c3c"
								numberOfStars={5}
								name="rating"
								starDimension="20px"
								starSpacing="3px"
							/>
						</div>
						<time className={style.Review__user__createdAt}>{getDatePublic(props)}</time>
					</div>

					<div className={style.Review__textBox}>
						<p className={style.Review__textBox__text}>{props.comment}</p>
					</div>

					<div className={style.Review__footer}>
						<div className={style.Review__likeOrDislike}>
							<button
								onClick={RateLike}
								className={style.Review__likeOrDislike__btn}
							>
								{props.user_score === 1 ? (
									<LikeFill />
								) : (
									<Like />
								)}
								<p>{props.likes}</p>
							</button>
							<button
								onClick={RateDisLike}
								className={style.Review__likeOrDislike__btn}
							>
								{props.user_score === 0 ? (
									<DislikeFill />
								) : (
									<Dislike />
								)}
								<p>{props.dislikes}</p>
							</button>
						</div>
						<div>
							<button
								className={style.Review__footer__btn}
								onClick={OpenChildComments}
							>
								Ответов: {props.count_child_reviews}
							</button>
							<button
								className={style.Review__footer__btnAddcom}
								onClick={opentCommentAddField}
							>
								Ответить
							</button>
						</div>
					</div>
				</div>
			</div>
			{openCommentAdd && (
				<div className={style.Review__childs}>
					<div className={style.Review__childs__AddComments__item}>
						<div className={style.Review__childs__AddComments__SetReview}>
							<div style={{ display: 'none' }}>
								<div className={style.Review__childs__AddComments__SetReview__rate}>
									Оценить отзыв:
									{[...Array(5)].map((star, index) => {
										index += 1;
										return (
											<button
												type="button"
												key={index}
												className={
													index <= rating
														? `${style.star__on}`
														: `${style.star__off}`
												}
												onClick={() => setRating(index)}
											>
												<span className={style.star}>&#9733;</span>
											</button>
										);
									})}
								</div>
							</div>
							<textarea
								rows="6"
								onChange={changeCommentVal}
								className={style.Review__childs__AddComments__SetReview__input}
								placeholder="Комментарий к отзыву"
							/>
						</div>
						<div className={style.Review__childs__AddComments__SetReview__footer}>
							<div
								onClick={opentCommentAddField}
								className={style.Review__childs__AddComments__SetReview__cancel}
							>Отмена</div>
							<button
								onClick={addChildComment}
								className={style.Review__childs__AddComments__SetReview__btn}
							>Ответить</button>
						</div>
					</div>
				</div>
			)}
			<div className={style.Review__childs}>
				{active &&
					props.child_reviews.map((item) => (
						<ChildComments props={item} style={{ width: "100%" }} />
					))}
			</div>
		</div>
	);
};
