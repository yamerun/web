import React, { useEffect, useState } from "react";
import style from "./ExchangerReviews.module.scss";
import StarRatings from "react-star-ratings";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";

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
    const getReviews = await fetch(
      `https://change.pro/api/reviews/get?sort=desc&orderBy=id&limit=5&exchanger_id=${info.data.exchanger_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    const getEchangerInfo = await fetch(
      `https://change.pro/api/exchangers/get?exchanger_id=${info.data.exchanger_id}`,
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

  
  return (
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
                {exchangerInfo.data.rating}
              </h1>
              <div
                className={style.ExchangerReviews__container__header__ratings}
              >
                <h1 style={{ opacity: "0.5" }}>Рейтинг</h1>
                <StarRatings
                  rating={exchangerInfo.data.rating}
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
                <Comments props={item} review={setReview} w={"100%"} />
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
