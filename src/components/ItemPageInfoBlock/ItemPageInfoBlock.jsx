import React,{useState} from "react";
import style from './ItemPage.module.scss'
export const ItemPageInfoBlock = ({item}) => {
    const [isOpen, setIsOpen] = useState(false);

    const ShowReviews = () => {
        setIsOpen(true);
      };

  return (
    <div className={style.itemPage__container__items__item2}>
    <div className={style.itemPage__container__items__item2__container}>
      <div
        className={style.itemPage__container__items__item2__container__status}
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
        className={style.itemPage__container__items__item2__container__status}
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
        className={style.itemPage__container__items__item2__container__status}
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
        className={style.itemPage__container__items__item2__container__status}
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
        className={style.itemPage__container__items__item2__container__status}
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
        className={style.itemPage__container__items__item2__container__status}
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
        className={style.itemPage__container__items__item2__container__status}
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
  );
};
