import React from "react";
import style from "./Article.module.scss";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
export const Articlepage = () => {
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const { article } = useLoaderData();
  console.log(article.data);
  function createMarkup(content) {
    return { __html: `${content}` };
  }

  return (
    <div className={style.Article}>
      <div className={style.Article__container}>
        <div className={style.Article__container__box}>
        <h1 className={style.Article__container__header__views}>
            Просмотрено: {article.data.count_views} раз
          </h1>
        <div className={style.Article__container__header}>
          <h1 className={style.Article__container__header__tittle}>
            {article.data.title}
          </h1>
          <Link to='/articles' className={style.Article__container__header__close} >✕</Link>
        </div>
        <article
          style={{color:'white'}}
          className={style.Article__container__content}
          dangerouslySetInnerHTML={createMarkup(article.data.content)}
        ></article>
        <div className={style.Article__container__footer}>
          <h1 className={style.Article__container__footer__date}>
            {article.data.created_at.date} / {article.data.created_at.time}
          </h1>
        </div>
      </div>
      </div>
    </div>
  );
};
