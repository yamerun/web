import React, { useEffect, useState, useRef } from "react";
import style from "./ItemPage.module.scss";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";
import { Footer } from "../../components/Footer/Footer";

export const exchangeLoader = async ({ params }) => {
  const id = params.id;
  const res = await fetch(
    `http://146.59.87.222/api/exchangers/get?exchanger_id=${id}`
  );
  const item = await res.json();
  return { id, item };
};

export const ItemPage = () => {
  const { item } = useLoaderData();
  console.log(item);
  const navigateToSite = (url) => {
    window.open(`${url}`);
  };
  const navigate = useNavigate();
  const [review, setReview] = useState();
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    axios
      .get(
        `http://146.59.87.222/api/reviews/get?sort=desc&orderBy=id&limit=5&exchanger_id=${item.data.id}`
      )
      .then(function (response) {
        setReview(response.data.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);




  const ShowReviews = () => {
    setIsOpen(true);
  };
  const HideReviews = () => {
    setIsOpen(false);
  };

  return (
    <div className={style.itemPage}>
      <Header />
      <div className={style.itemPage__container}>
        <h1 className={style.itemPage__container__header}>{item.data.name}</h1>
        <div className={style.itemPage__container__items}>
          <div className={style.itemPage__container__items__item}>
            <button
              className={style.itemPage__container__items__item__btn}
              onClick={() => navigateToSite(item.data.site_url)}
            >
              Перейти на {item.data.name}
            </button>
            <img alt="logo" src={`${item.data.logo}`} />
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
                  {item.data.sum_reserves}
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
                  {item.data.country}0/69
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
            <p className={style.itemPage__container__items__item3__rating}>
              Рейтинг на Change.Pro {item.data.rating}/10
            </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={style.itemPage__reviews}>
          <button
            className={style.itemPage__reviews__close}
            onClick={HideReviews}
          >
            ✕
          </button>
          <div className={style.itemPage__reviews__headerBox}>
          <h1 className={style.itemPage__reviews__header}>
            Отзывы {item.data.name}
          </h1>  
         <button className={style.itemPage__reviews__button}>
          Оставить отзыв
         </button>
          </div>
          {review != null ? review.map((item) => <Comments props={item} />) : (<div></div>)}
        </div>
      )}
      <Footer />
    </div>
  );
};
