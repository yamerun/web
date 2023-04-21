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
        "http://146.59.87.222/api/reviews/like",
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
        "http://146.59.87.222/api/reviews/dislike",
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
    <div className={style.ChildComments}>
      <div className={style.ChildComments__user}>
        <h1 className={style.ChildComments__user__name}>{props.author.name}</h1>
        <StarRatings
          rating={props.rating}
          starRatedColor="yellow"
          numberOfStars={5}
          name="rating"
          starDimension="10px"
          starSpacing="2px"
        />
        <h1 className={style.ChildComments__user__createdAt}>
          {props.created_at}
        </h1>
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
            <p style={{ color: "#77D22D" }}> {props.likes}</p>
          </button>
          <button
            onClick={RateDisLike}
            className={style.ChildComments__likeOrDislike__btn}
          >
            <Dislike  />
            <p style={{ color: "#F3F3F3" , opacity:0.5 }}>{props.dislikes}</p>
          </button>
        </div>
      </div>
    </div>
  );
};
