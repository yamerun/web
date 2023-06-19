import React, { useEffect, useState } from "react";
import style from "./Articles.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { Link } from "react-router-dom";

export const ArticleLoader = async ({ params }) => {
  const articleid = params.id;
  const response = await fetch(
    `https://change.pro/api/articles/get_detail?id=${articleid}`
  );
  const article = await response.json();

  return { article, articleid };
};

export const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArcicles] = useState([]);

  const goToArticle = ({ id }) => {
    navigate(`/article/${id}`);
  };

  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));

  useEffect(() => {
    axios
      .get(`https://change.pro/api/articles/get?limit=2&offset=0`)
      .then(function (response) {
        setArcicles(response.data.data);
      });
  }, []);

  function createMarkup({ preview }) {
    return { __html: `${preview}` };
  }

  return (
    <div className={style.Articles}>
      <div className={style.Articles__header}></div>
      <div className={style.Articles__container__articles}>
        {articles.map((item) => (
          <article
            className={style.Articles__container__article}
            onClick={(e) => goToArticle(item)}
          >
            <img
              alt=""
              src={`https://change.pro/${item.preview_picture.path}`}
              className={style.Articles__container__article__img}
            />
            <div className={style.Articles__container__article__header}>
              <h1
                className={style.Articles__container__article__header__tittle}
              >
                {item.title}
              </h1>
            </div>
            <div
              style={{ color: "white" }}
              className={style.Articles__container__article__text}
              dangerouslySetInnerHTML={createMarkup(item)}
            ></div>

            <p className={style.Articles__container__article__header__date}>
              {item.created_at.date} {item.created_at.time}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};
