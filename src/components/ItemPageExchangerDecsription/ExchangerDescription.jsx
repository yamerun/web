import React from "react";
import style from './Description.module.scss'
import StarRatings from "react-star-ratings";
export const ItemPageExchangerDescription = ({item}) => {
    return(
        <div className={style.itemPage__container__items__item3}>
        <h1 className={style.itemPage__container__items__item3__review}>
          Описание обменника от администратора Change.Pro{" "}
        </h1>
        <p className={style.itemPage__container__items__item3__text}>
          {item.data.description}
        </p>
        <div
          className={style.itemPage__container__items__item3__rating__box}
        >
          <StarRatings
            rating={item.data.rating}
            starRatedColor="yellow"
            numberOfStars={10}
            starDimension={15}
            starSpacing={3}
            name="rating"
          />
          <p className={style.itemPage__container__items__item3__rating}>
            Рейтинг на Change.Pro {item.data.rating} /10
          </p>
        </div>
      </div>
    )
}