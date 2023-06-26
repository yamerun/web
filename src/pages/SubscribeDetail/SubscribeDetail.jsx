import React from "react";

import style from "./SubscribeDetail.module.scss";

export default function SubscribeDetail() {
  return (
    <div className={style.subscribe}>
      <h1 className={style.subscribe__heading}>ПОДПИСКА</h1>
      <div className={style.subscribe__container}>
        <article className={style.subscribe__container__block}>
          <h1 className={style.subscribe__container__block__heading}>
            до конца подписки осталось
          </h1>
          30 дней 18 часов 42 минуты
          <h1 className={style.subscribe__container__block__heading}>Инструкция по оплате:</h1>
          <p className={style.subscribe__container__text}>
            взять деньги положить на карту сбер альфа тинькофф нажать оплатить и
            оплатить после этого оплата будет считаться успешной и вы оплатите
            подписку
          </p>
          <button className={style.subscribe__container__block__btn}>
            Оплатить
          </button>
        </article>
      </div>
    </div>
  );
}
