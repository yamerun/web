import React, { useEffect } from "react";
import style from "./Comments.module.scss";
import StarRatings from "react-star-ratings";

export const Comments = ({ props }) => {
  return (
    <div className={style.Review}>
      <div className={style.Review__textBox}>
        <div className={style.Review__textBox__user}>
        <StarRatings
          rating={props.rating}
          starRatedColor="yellow"
          numberOfStars={5}
          name='rating'
          starDimension='20px'
          starSpacing='5px'
        />
        <h1 className={style.Review__textBox__createdAt}>{props.created_at}</h1>
        </div>
     
        <p className={style.Review__textBox__text}>{props.comment}</p>
      </div>
    </div>
  );
};
