import React, { useEffect, useState, useRef } from "react";
import style from "./ItemPage.module.scss";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";
import { Footer } from "../../components/Footer/Footer";
import { AddComment } from "../../components/AddComment/AddComment";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { ImageComponent } from "../../components/ImageComponent/Image";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../store/userAccountSlice/AccountSlice";

export const exchangeLoader = async ({ params }) => {
  const id = params.id;
  const res = await fetch(
    `https://change.pro/api/exchangers/get?exchanger_id=${id}`
  );
  const item = await res.json();
  return { id, item };
};

export const ItemPage = () => {
  const dispatch = useDispatch();
  const { item } = useLoaderData();
  const navigate = useNavigate();
  const [review, setReview] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [imgData, setImgData] = useState({});

  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));

  useEffect(() => {
    axios
      .get(
        `https://change.pro/api/reviews/get?sort=desc&orderBy=id&limit=5&exchanger_id=${item.data.id}`
      )
      .then(function (response) {
        setReview(response.data.data);
        console.log(response.data.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const ref = useRef(null);

  const ShowReviews = () => {
    setIsOpen(true);
  };
  const HideReviews = () => {
    setIsOpen(false);
  };
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt !== null && role !== null && role === "exchanger") {
      dispatch(setUserRole(true));
    } else dispatch(setUserRole(false));
  }, [jwt, role]);


  return (
    <div className={style.itemPage}>
      {isOpen && (
        <AddComment HideReviews={HideReviews} id={item.data.id}  />
      )}
      <Header />
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <div className={style.itemPage__container} ref={ref}>
        <div className={style.itemPage__container__exchangeInfo}>
          {item.data.logo.length != 0 && (
            <ImageComponent imageInfo={item.data.logo} />
          )}
          <h1 className={style.itemPage__container__header}>
            {item.data.name}
          </h1>
        </div>
        <div className={style.itemPage__container__items}>
          <div className={style.itemPage__container__items__item}>
            {
              item.data.iframe.src === '' ? (<h1 className={style.empty}>{item.data.name}</h1> ): ( <iframe
                src={item.data.iframe.src}
                className={
                  style.itemPage__container__Iframe 
                }
              />)
            }
           
          </div>
          <div className={style.itemPage__container__items__item2}>
            <div className={style.itemPage__container__items__item2__container}>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Статус:
                </h1>
                <h1
                  style={{ borderColor: `${item.data.status.color}` }}
                  className={
                    style.itemPage__container__items__item2__container__status__header2
                  }
                >
                  {item.data.status.title}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Сумма резервов:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.sum_reserves} &#8381;
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Доступность:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.access}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Курсов обменов:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.count_reviews}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Возраст:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.age}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Страна:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.country}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Отзывы:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  0/69
                </h1>
              </div>
              <button
                className={style.itemPage__container__Addreview}
                onClick={() => ShowReviews()}
              >
                Оставить отзыв об обменнике →
              </button>
            </div>
          </div>
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
        </div>
      </div>
      <div className={style.itemPage__comments}>
        <h1 className={style.itemPage__reviews__header}>
          Отзывы {item.data.name}
        </h1>
        {review != null ? (
          review.map((item) => (
            <Comments props={item} review={setReview} w={"30%"} />
          ))
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </div>
  );
};
