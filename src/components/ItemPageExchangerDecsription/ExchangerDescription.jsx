import React from "react";
import style from './Description.module.scss'

export const ItemPageExchangerDescription = ({ item }) => {
	return (
		<div className="block">
			<div className={style.itemPage__container__items}>
				<h3 className={style.itemPage__container__items__title}>
					Описание обменника от CHANGE.PRO{" "}
				</h3>
				<div className={style.itemPage__container__items__description}>
					<p>{item.data.description}</p>
				</div>
			</div>
		</div>
	)
}