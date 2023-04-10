import React from "react";
import style from "./Article.module.scss";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

export const Articlepage = () => {
  return (
    <div className={style.Article}>
      <Header />
      <div className={style.Article__container}>
        <article className={style.Article__container__card}>
            <h1 className={style.Article__container__card__header}>Article header</h1>
          <div className={style.Article__container__card__img}></div>
          <p className={style.Article__container__card__text}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
            porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
          </p>
        </article>
      </div>
      <Footer />
    </div>
  );
};
