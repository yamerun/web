import React, { useEffect, useState } from "react";
import style from "./Comments.module.scss";
import StarRatings from "react-star-ratings";
import { Like } from "../Like/Like";
import { Dislike } from "../Dislike/Dislike";
import axios from "axios";
import { ChildComments } from "../ChildComments/ChildComments";

export const Comments = ({ props, review ,w}) => {
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
      .catch(function (error) {});
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
        "http://146.59.87.222/api/reviews/dislike",
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

  const addChildComment = () => {
    axios
      .post(
        `http://146.59.87.222/api/reviews/create`,
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

  console.log([props]);

  return (
    <div className={style.Review} style={{width:w}}>
      <div className={style.Review__user}>
        <h1 className={style.Review__user__name}>{props.author.name}</h1>
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
        <p className={style.Review__textBox__text}>{props.comment}</p>
      </div>
      <div className={style.Review__footer}>
        <div className={style.Review__likeOrDislike}>
          <button
            onClick={RateLike}
            className={style.Review__likeOrDislike__btn}
          >
            <Like />
            <p style={{ color: "#77D22D" }}> {props.likes}</p>
          </button>
          <button
            onClick={RateDisLike}
            className={style.Review__likeOrDislike__btn}
          >
            <Dislike />
            <p style={{ color: "#F3F3F3", opacity: 0.5 }}>{props.dislikes}</p>
          </button>
        </div>
        <div>
          <button
            className={style.Review__footer__btn}
            onClick={OpenChildComments}
          >
            ответов : {props.count_child_reviews}
          </button>
          <button
            className={style.Review__footer__btnAddcom}
            onClick={opentCommentAddField}
          >
            ответить
          </button>
        </div>
      </div>
      {openCommentAdd && (
        <div className={style.Review__childs__AddComments}>
          <div className={style.Review__childs__AddComments__SetReview}>
            <div className={style.Review__childs__AddComments__SetReview__rate}>
              Оценить отзыв :
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
            <input
              onChange={changeCommentVal}
              className={style.Review__childs__AddComments__SetReview__input}
              placeholder="Комментарий к отзыву"
            />
          </div>
          <button
            onClick={addChildComment}
            className={style.Review__childs__AddComments__SetReview__btn}
          >
          </button>
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
