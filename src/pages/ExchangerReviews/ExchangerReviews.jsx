import React, { useState } from "react";
import style from "./ExchangerReviews.module.scss";
import StarRatings from "react-star-ratings";
import { useLoaderData } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";
const AccountNavigation = React.lazy(() => import('../../components/PersonalAccountNavigation/AccountNavigation'));

export const reviewloader = async () => {
	const key = localStorage.getItem("jwt");
	if (key) {
		const getInfo = await fetch("https://change.pro/api/user/get", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		const info = await getInfo.json();
		const exchanger_id = info.data.role.id;

		console.log(info);

		const getReviews = await fetch(
			`https://change.pro/api/reviews/get?sort=desc&orderBy=id&limit=5&exchanger_id=${exchanger_id}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			}
		);
		const getEchangerInfo = await fetch(
			`https://change.pro/api/exchangers/get?exchanger_id=${exchanger_id}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			}
		);
		const exchangerInfo = await getEchangerInfo.json();

		const echangerReviews = await getReviews.json();
		return { echangerReviews, exchangerInfo };
	} else window.location.href = "/";
};

export const ExchangerReviews = () => {
	const { echangerReviews, exchangerInfo } = useLoaderData();
	const [review, setReview] = useState();

	return (
		<div className={'section-wrapper'}>
			<div className={'container-full'}>
				<div className="row">
					<sidebar className={'col-md-4 col-lg-3'}>
						<div className="block">
							<React.Suspense fallback={<h6>...loading</h6>}>
								<AccountNavigation type={'exchanger'} />
							</React.Suspense>
						</div>
					</sidebar>
					<main className={style.PersonalAccount__main + ' col-md-8 col-lg-9'}>
						<div className="block">
							<div className={style.ExchangerReviews}>
								<div className={style.ExchangerReviews__PageBox}>
									<div className={style.ExchangerReviews__container}>
										<div className={style.ExchangerReviews__container__header}>
											<h1 className={style.ExchangerReviews__container__header__text}>
												Отзывы
											</h1>
											<div
												className={style.ExchangerReviews__container__header__ratingBox}
											>
												<h1
													className={
														style.ExchangerReviews__container__header__ratingBox__text
													}
												>
													{exchangerInfo.data?.rating}
												</h1>
												<div
													className={style.ExchangerReviews__container__header__ratings}
												>
													<h1 style={{ opacity: "0.5" }}>Рейтинг</h1>
													<StarRatings
														rating={exchangerInfo.data?.rating}
														starRatedColor="yellow"
														numberOfStars={5}
														name="rating"
														starDimension="20px"
														starSpacing="3px"
													/>
												</div>
											</div>
										</div>
										<div className={style.ExchangerReviews__commentsBox}>
											{echangerReviews.data != null ? (
												echangerReviews.data.map((item) => (
													<Comments
														props={item}
														review={setReview}
														w={"100%"}
														key={item.id}
													/>
												))
											) : (
												<div></div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};
