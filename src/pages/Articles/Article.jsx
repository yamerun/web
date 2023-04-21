import React, { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import style from "./Articles.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
export const Articles = () => {
  const navigate = useNavigate();
  const goToarticle = () => {
    navigate("/articlepage");
  };

  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));


  return (
    <div className={style.Articles}>
      <Header />
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <div className={style.Articles__container}>
        <div className={style.Articles__container__articles}>
          <article
            className={style.Articles__container__article}
            onClick={goToarticle}
          >
            <div className={style.Articles__container__article__img}></div>
            <h1 className={style.Articles__container__article__header}>
              Article title
            </h1>
            <p className={style.Articles__container__article__text}>
              Lorem ipsum dois dis panunc, blandit vel, luctus pulvinar,
              hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
              Donec vitae sapien id,
            </p>
          </article>
          <article
            className={style.Articles__container__article}
            onClick={goToarticle}
          >
            <div className={style.Articles__container__article__img}></div>
            <h1 className={style.Articles__container__article__header}>
              Article title
            </h1>
            <p className={style.Articles__container__article__text}>
              Lorem ipsum dois dis panunc, blandit vel, luctus pulvinar,
              hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
              Donec vitae sapien id,
            </p>
          </article>
          <article
            className={style.Articles__container__article}
            onClick={goToarticle}
          >
            <div className={style.Articles__container__article__img}></div>
            <h1 className={style.Articles__container__article__header}>
              Article title
            </h1>
            <p className={style.Articles__container__article__text}>
              Lorem ipsum dois dis panunc, blandit vel, luctus pulvinar,
              hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
              Donec vitae sapien id,
            </p>
          </article>
          <article
            className={style.Articles__container__article}
            onClick={goToarticle}
          >
            <div className={style.Articles__container__article__img}></div>
            <h1 className={style.Articles__container__article__header}>
              Article title
            </h1>
            <p className={style.Articles__container__article__text}>
              Lorem ipsum dois dis panunc, blandit vel, luctus pulvinar,
              hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
              Donec vitae sapien id,
            </p>
          </article>
          <article
            className={style.Articles__container__article}
            onClick={goToarticle}
          >
            <div className={style.Articles__container__article__img}></div>
            <h1 className={style.Articles__container__article__header}>
              Article title
            </h1>
            <p className={style.Articles__container__article__text}>
              Lorem ipsum dois dis panunc, blandit vel, luctus pulvinar,
              hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
              Donec vitae sapien id,
            </p>
          </article>
          <article
            className={style.Articles__container__article}
            onClick={goToarticle}
          >
            <div className={style.Articles__container__article__img}></div>
            <h1 className={style.Articles__container__article__header}>
              Article title
            </h1>
            <p className={style.Articles__container__article__text}>
              Lorem ipsum dois dis panunc, blandit vel, luctus pulvinar,
              hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
              Donec vitae sapien id,
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};
