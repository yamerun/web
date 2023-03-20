import React, { useEffect, useState } from "react";
import style from "./ItemPage.module.scss";
import { Header } from "../../components/Header/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  const navigateToSite = (url) => {
  window.open(`${url}`)
   
  }
  return (
    <div className={style.itemPage}>
    <Header />
    <div className={style.itemPage__container}>
      <h1 className={style.itemPage__container__header}>{item.data.name}</h1>
      <div className={style.itemPage__container__items}>
        <div className={style.itemPage__container__items__item}>
          <button className={style.itemPage__container__items__item__btn} onClick={() => navigateToSite(item.data.site_url)}>
            Перейти на {item.name}
          </button>
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
              style={{borderColor:`${item.data.color}`}}
                className={
                  style.itemPage__container__items__item2__container__status__header2
                }
              >
                {item.data.status}
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
            <h1 className={style.itemPage__container__review}>
              Оставить отзыв об обменнике →
            </h1>
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
            Рейтинг на Change.Pro {item.data.rating}
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};
