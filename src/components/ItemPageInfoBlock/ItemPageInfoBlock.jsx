import React, { useState } from "react";
import style from './ItemPage.module.scss'
export const ItemPageInfoBlock = ({ item, ShowReviews }) => {
	return (
		<div className="block">
			<div className={style.itemPage__container__items}>
				<h3 className={style.itemPage__container__items__title}>Информация</h3>
				<dl className={style.itemPage__container__items__listInfo}>
					<dt>Сумма резервов:</dt>
					<dd>{item.data.sum_reserves} &#8381;</dd>
					<dt>Доступность:</dt>
					<dd>{item.data.access}</dd>
					<dt>Курсов обменов:</dt>
					<dd>{item.data.count_reviews}</dd>
					<dt>Возраст:</dt>
					<dd>{item.data.age}</dd>
					<dt>Страна:</dt>
					<dd>{item.data.country}</dd>
					<dt>Отзывы:</dt>
					<dd>0/69</dd>
				</dl>

				{/**
				<button
						className={style.itemPage__container__Addreview}
						onClick={() => ShowReviews()}
					>
						Оставить отзыв об обменнике →
					</button>
					*/}
			</div>
		</div>
	);
};
