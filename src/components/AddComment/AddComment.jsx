import React, { useState } from "react";
import style from "./AddComment.module.scss";
import axios from "axios";
import StarRatings from "react-star-ratings";
export const AddComment = ({ HideReviews, id, review }) => {
  const Register = () => {
    axios
      .post(
        `http://146.59.87.222/api/reviews/create`,
        {
          comment: textVal,
          rating: rating,
          exchanger_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        HideReviews();
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState("");
  const [textVal, setTextVal] = useState("");

  const setInputsValue = (e) => {
    setTextVal(e.target.value);
  };
  return (
    <div className={style.AddComment}>
      <div className={style.AddComment__form}>
        <div className={style.AddComment__inputBox}>
          <textarea
            className={style.AddComment__inputBox__fields}
            onChange={(e) => setInputsValue(e)}
          ></textarea>
        </div>
        <div>
          <p className={style.AddComment__setRating}>Рейтинг</p>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={
                  index <= rating ? `${style.star__on}` : `${style.star__off}`
                }
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className={style.star}>&#9733;</span>
              </button>
            );
          })}
        </div>
        <span style={{ color: "white" }}>{error}</span>
        <div className={style.AddComment__controlls}>
          <button onClick={Register} className={style.AddComment__add}>
            оставить отзыв
          </button>
          <button onClick={HideReviews} className={style.AddComment__cancell}>
            отменить
          </button>
        </div>
      </div>
      <button className={style.AddComment__close} onClick={HideReviews}>
        ✕
      </button>
    </div>
  );
};
