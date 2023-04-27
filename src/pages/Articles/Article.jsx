import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import style from "./Articles.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import axios from "axios";
export const Articles = () => {
  const navigate = useNavigate();

  const [articles, setArcicles] = useState([]);
  const goToarticle = () => {
    navigate("/articlepage");
  };

  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));

  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/articles/get?limit=2&offset=0`)
      .then(function (response) {
        setArcicles(response.data.data);
      });
  }, []);

  function createMarkup(content) {
    return { __html: `${content}` };
  }

  return (
    <div className={style.Articles}>
      <Header />
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <div className={style.Articles__container}>
        <div className={style.Articles__container__articles}>
          {articles.map((item) => (
            <article className={style.Articles__container__article}>
              <div  className={style.Articles__container__article__header}>
              <h1 className={style.Articles__container__article__header__tittle}>{item.title}</h1>
                <p className={style.Articles__container__article__header__date}>
                  {item.created_at.date} {item.created_at.time}
                </p>
              </div>
              <div className={style.Articles__container__article__text} dangerouslySetInnerHTML={createMarkup(item.content) }></div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
