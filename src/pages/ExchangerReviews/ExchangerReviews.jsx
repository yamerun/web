import React ,{useEffect}from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import style from "./ExchangerReviews.module.scss";
import StarRatings from "react-star-ratings";
import { Like } from "../../components/Like/Like";
import { Dislike } from "../../components/Dislike/Dislike";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const ExchangerReviews = () => {
  
  const navigate = useNavigate();
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (isExchangerRole === false) {
      navigate("/");
    }
  }, [isExchangerRole]);
  
  return (
    <div className={style.ExchangerReviews}>
      <Header />
      <ExchangerAccountNavigation />
      <div className={style.ExchangerReviews__container}>
        <div className={style.ExchangerReviews__ReviewArticle}>
          <div className={style.ExchangerReviews__container__header}>
            <h1 className={style.ExchangerReviews__container__header__text}>
              Отзывы
            </h1>
            <div
              className={style.ExchangerReviews__container__header__ratingBox}
            >
              <h1
                className={
                  style.ExchangerReviews__container__header__ratingBox__text
                }
              >
                9.1
              </h1>
              <div
                className={style.ExchangerReviews__container__header__ratings}
              >
                <h1 style={{ opacity: "0.5" }}>Рейтинг</h1>
                <StarRatings
                  rating={4}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="3px"
                />
              </div>
            </div>
          </div>
          <div className={style.ExchangerReviews__ReviewArticle__commentsBox}>
            <div
              className={
                style.ExchangerReviews__ReviewArticle__commentsBox__comment
              }
            >
              <div
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__header
                }
              >
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__user
                  }
                >
                  <h1 style={{ opacity: "0.5" }}>Term1k</h1>
                  <StarRatings
                    rating={4}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="3px"
                  />
                </div>
                <h1 style={{ opacity: "0.5" }}>13.02.2023, 14:34</h1>
              </div>
              <p
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__text
                }
              >
                Несмотря на все более и более массовое принятие криптовалют по
                всему миру, обойтись без фиатных денег пока невозможно.
                Держателям криптовалюты все чаще необходимо регулярно продавать
                и покупать Bitсoin и другие монеты. Но как это сделать, избежав
                мошенников и не потеряв деньги из-за невыгодного курса?
              </p>
              <div
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__rate
                }
              >
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__like
                  }
                >
                  <Like />
                  <p style={{ color: "#77D22D" }}>10</p>
                </div>
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__like
                  }
                >
                  <Dislike />
                  <p style={{ color: "white", opacity: "0.5" }}>0</p>
                </div>

                <button
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__rate__btn
                  }
                >
                  Ответить
                </button>
              </div>
            </div>
          </div>
          <div className={style.ExchangerReviews__ReviewArticle__commentsBox}>
            <div
              className={
                style.ExchangerReviews__ReviewArticle__commentsBox__comment
              }
            >
              <div
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__header
                }
              >
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__user
                  }
                >
                  <h1 style={{ opacity: "0.5" }}>Term1k</h1>
                  <StarRatings
                    rating={4}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="3px"
                  />
                </div>
                <h1 style={{ opacity: "0.5" }}>13.02.2023, 14:34</h1>
              </div>
              <p
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__text
                }
              >
                Несмотря на все более и более массовое принятие криптовалют по
                всему миру, обойтись без фиатных денег пока невозможно.
                Держателям криптовалюты все чаще необходимо регулярно продавать
                и покупать Bitсoin и другие монеты. Но как это сделать, избежав
                мошенников и не потеряв деньги из-за невыгодного курса?
              </p>
              <div
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__rate
                }
              >
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__like
                  }
                >
                  <Like />
                  <p style={{ color: "#77D22D" }}>10</p>
                </div>
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__like
                  }
                >
                  <Dislike />
                  <p style={{ color: "white", opacity: "0.5" }}>0</p>
                </div>

                <button
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__rate__btn
                  }
                >
                  Ответить
                </button>
              </div>
            </div>
          </div>
          <div className={style.ExchangerReviews__ReviewArticle__commentsBox}>
            <div
              className={
                style.ExchangerReviews__ReviewArticle__commentsBox__comment
              }
            >
              <div
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__header
                }
              >
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__user
                  }
                >
                  <h1 style={{ opacity: "0.5" }}>Term1k</h1>
                  <StarRatings
                    rating={4}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="3px"
                  />
                </div>
                <h1 style={{ opacity: "0.5" }}>13.02.2023, 14:34</h1>
              </div>
              <p
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__text
                }
              >
                Несмотря на все более и более массовое принятие криптовалют по
                всему миру, обойтись без фиатных денег пока невозможно.
                Держателям криптовалюты все чаще необходимо регулярно продавать
                и покупать Bitсoin и другие монеты. Но как это сделать, избежав
                мошенников и не потеряв деньги из-за невыгодного курса?
              </p>
              <div
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__rate
                }
              >
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__like
                  }
                >
                  <Like />
                  <p style={{ color: "#77D22D" }}>10</p>
                </div>
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__like
                  }
                >
                  <Dislike />
                  <p style={{ color: "white", opacity: "0.5" }}>0</p>
                </div>

                <button
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__rate__btn
                  }
                >
                  Ответить
                </button>
              </div>
            </div>
          </div>
          <div className={style.ExchangerReviews__ReviewArticle__commentsBox}>
            <div
              className={
                style.ExchangerReviews__ReviewArticle__commentsBox__comment
              }
            >
              <div
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__header
                }
              >
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__user
                  }
                >
                  <h1 style={{ opacity: "0.5" }}>Term1k</h1>
                  <StarRatings
                    rating={4}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="3px"
                  />
                </div>
                <h1 style={{ opacity: "0.5" }}>13.02.2023, 14:34</h1>
              </div>
              <p
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__text
                }
              >
                Несмотря на все более и более массовое принятие криптовалют по
                всему миру, обойтись без фиатных денег пока невозможно.
                Держателям криптовалюты все чаще необходимо регулярно продавать
                и покупать Bitсoin и другие монеты. Но как это сделать, избежав
                мошенников и не потеряв деньги из-за невыгодного курса?
              </p>
              <div
                className={
                  style.ExchangerReviews__ReviewArticle__commentsBox__comment__rate
                }
              >
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__like
                  }
                >
                  <Like />
                  <p style={{ color: "#77D22D" }}>10</p>
                </div>
                <div
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__like
                  }
                >
                  <Dislike />
                  <p style={{ color: "white", opacity: "0.5" }}>0</p>
                </div>

                <button
                  className={
                    style.ExchangerReviews__ReviewArticle__commentsBox__comment__rate__btn
                  }
                >
                  Ответить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
