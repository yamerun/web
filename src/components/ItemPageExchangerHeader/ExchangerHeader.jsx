import React from "react";
import StarRatings from "react-star-ratings";
import style from '../../pages/itemPage/ItemPage.module.scss'
import { Marks } from "../Marks/Marks";

const ToggleToFavorite = React.lazy(() =>
	import("../AddToFavorite/AddToFavorite")
);

const ImageComponent = React.lazy(() =>
	import("../ImageComponent/Image")
);

export const ItemPageExchangerHeader = ({ item }) => {
	return (
		<div className="block">
			<div className={style.itemPage__container__exchangeInfo}>
				{Object.keys(item.data.logo).length !== 0 ? (
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
						<ImageComponent imageInfo={item.data.logo} />
					</React.Suspense>
				) : (
					<div className={style.empty__header}>{item.data.name}</div>
				)}
				<h1 className={style.itemPage__container__header}>
					{item.data.name}
				</h1>
				<div
					className={style.itemPage__container__header__rating}
					title="Рейтинг на Change.Pro"
				>
					<StarRatings
						rating={item.data.rating}
						starRatedColor="#df3c3c"
						numberOfStars={5}
						starDimension={26}
						starSpacing={2}
						name="rating"
					/>
				</div>
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
					<div className={style.itemPage__container__header__status} style={{ color: `${item.data.status.color}` }}>{item.data.status.title}</div>
					<div className={style.itemPage__container__header__favorite}>
						<ToggleToFavorite itemid={item.data.id} />
					</div>
				</React.Suspense>
				<div className={style.itemPage__exchangermarks}>
					<div className={style.itemPage__exchangermarks__list}>
						{item.data.mark_types.length !== 0
							? item.data.mark_types.map((item) => <Marks prop={item} />)
							: "✖"}
					</div>
				</div>
			</div>

		</div>
	)
}