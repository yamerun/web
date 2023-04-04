import React, { useEffect } from "react";
import style from "./Comments.module.scss";
import StarRatings from "react-star-ratings";

export const Comments = ({ props }) => {
  return (
    <div className={style.Review}>
      <div className={style.Review__user}>
        <h1 className={style.Review__user__name}>{props.author_id}</h1>
        <StarRatings
          rating={props.rating}
          starRatedColor="yellow"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="3px"
        />
        <h1 className={style.Review__user__createdAt}>{props.created_at}</h1>
      </div>
      <div className={style.Review__textBox}>
        <p className={style.Review__textBox__text}>
          {props.comment}
          {props.comment}
          {props.comment}
          {props.comment}
          {props.comment}
          {props.comment}
          {props.comment}
        </p>
      </div>
    </div>
  );
};
