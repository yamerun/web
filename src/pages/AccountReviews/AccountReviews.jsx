import React from "react";
import style from "./AccountReviews.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";

export const AccountReviewloader = async () => {
  const key = localStorage.getItem("jwt");
  const id = localStorage.getItem("userId");
  if (key) {
    const res = await fetch(
      `https://change.pro/api/reviews/get_by_author?author_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    const item = await res.json();
    return { item,id };
  } else window.location.href = '/';
};

export const AccountReviews = () => {
  const { item,id } = useLoaderData();

  return (
    <div className={style.AccountReviews}>
      <div className={style.AccountReviews__PageBox}>
        <div className={style.AccountReviews__container}>
          <div className={style.AccountReviews__container__header}>
            <h1 className={style.AccountReviews__container__header__text}>
              Отзывы
            </h1>
            <div
              className={style.AccountReviews__container__header__ratingBox}
            ></div>
          </div>
          <div className={style.AccountReviews__commentsBox}>
            {item.data != null ? (
              item.data.map((item) => (
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
