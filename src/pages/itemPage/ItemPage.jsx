import React from "react";
import style from "./ItemPage.module.scss";
import { Header } from "../../components/Header/Header";
import { useSelector } from "react-redux";

export const ItemPage = () => {
  const { exchange } = useSelector((state) => ({
    exchange: state.itemsSlice.exchange,
  }));

  console.log(exchange);

  return (
    <div className={style.itemPage}>
      <Header />
      <div className={style.itemPage__container}>
        <h1 className={style.itemPage__container__header}>{exchange.name}</h1>
        <div className={style.itemPage__container__items}>
          <div className={style.itemPage__container__items__item}>
            <button className={style.itemPage__container__items__item__btn}>
              Перейти на {exchange.name}
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
                  className={
                    style.itemPage__container__items__item2__container__status__header2
                  }
                >
                  {exchange.status}
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
                  {exchange.sum_reserves}
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
                  {exchange.access}
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
                  {exchange.count_reviews}
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
                  {exchange.age}
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
                  {exchange.country}
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
                  {/*exchange.country*/}0/69
                </h1>
              </div>
              <h1
                className={
                  style.itemPage__container__review
                }
              >
               Оставить отзыв об обменнике →
              </h1>
            </div>
          </div>
          <div className={style.itemPage__container__items__item3}>
           <h1 className={style.itemPage__container__items__item3__review}>Описание обменника от администратора Change.Pro </h1>
            <p className={style.itemPage__container__items__item3__text}>{exchange.description}</p>
            <p className={style.itemPage__container__items__item3__rating}>Рейтинг на Change.Pro               {exchange.rating}</p>
          </div>


        </div>
      </div>
    </div>
  );
};
