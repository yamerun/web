import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import style from "./ExchangerReviews.module.scss";
import StarRatings from "react-star-ratings";
import { Like } from "../../components/Like/Like";
import { Dislike } from "../../components/Dislike/Dislike";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";

export const reviewloader = async () => {
  const key = localStorage.getItem("jwt");
  const id = localStorage.getItem("userId");

  if (key) {
    const res = await fetch(
      `http://146.59.87.222/api/reviews/get?sort=desc&orderBy=id&limit=5&exchanger_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    const res2 = await fetch(
      `http://146.59.87.222/api/exchangers/get?exchanger_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    const item = await res.json();

    const item2 = await res2.json();

    return { item, id, item2 };
  } else useNavigate("/login");
};

export const ExchangerReviews = () => {
  const { item } = useLoaderData();
  const { item2 } = useLoaderData();
  const { id } = useLoaderData();
  const navigate = useNavigate();
  const [review, setReview] = useState();
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (isExchangerRole === false) {
      navigate("/");
    }
  }, [isExchangerRole]);

  console.log(item2);

  return (
    <div className={style.ExchangerReviews}>
      <div className={style.ExchangerReviews__PageBox}>
        <Header />
        <ExchangerAccountNavigation />
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
              {item2.data.rating}
              </h1>
              <div
                className={style.ExchangerReviews__container__header__ratings}
              >
                <h1 style={{ opacity: "0.5" }}>Рейтинг</h1>
                <StarRatings
                  rating={item2.data.rating}
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
      <Footer />
    </div>
  );
};
