import React,{useEffect} from "react";
import style from "./InfoPage.module.scss";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const InfoPage = () => {
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
    <div className={style.infoPage}>
      <Header />
      <ExchangerAccountNavigation />
      <div className={style.infoPage__mainContainer}>
        <div className={style.infoPage__mainContainer__infoBox}>
          <h1 className={style.infoPage__mainContainer__infoBox__header}>
            Информация
          </h1>
          <div className={style.infoPage__mainContainer__infoBox__articles}>
            <div className={style.infoPage__mainContainer__infoBox__items}>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Обменный пункт</h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1 style={{ opacity: "0.5" }}>AlfaBit</h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
                style={{ backgroundColor: "#46464B" }}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Статус в листинге</h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1 style={{ color: "#77D22D" }}>Включен</h1>
                  <h1 style={{ textDecoration: "underline" }}>Выключить</h1>
                  <h1 style={{ opacity: "0.5" }}>курсы загружены</h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Загружено курсов</h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>1569</h1>
                  <h1 style={{ opacity: "0.5" }}>
                    для русскоязычной версии мониторинга{" "}
                  </h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
                style={{ backgroundColor: "#46464B" }}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Экспорт загружен и обработан</h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  {" "}
                  <h1 style={{ opacity: "0.5" }}>за</h1>
                  <h1>0.3526</h1>
                  <h1 style={{ opacity: "0.5" }}>
                    секунд ( 1.3 секунды назад ){" "}
                  </h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Ошибочные курсы</h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  {" "}
                  <h1 style={{ color: "#FE0000" }}>21</h1>
                  <h1 style={{ opacity: "0.5" }}>курс отклонен </h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
                style={{ backgroundColor: "#46464B" }}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Сумма резервов</h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1 style={{ opacity: "0.5" }}>$44 919 256</h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Дата начала работы</h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1 style={{ opacity: "0.5" }}>20 февраля 2019</h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
                style={{ backgroundColor: "#46464B" }}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Передача GET-параметров</h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1 style={{ color: "#77D22D" }}>Включенo</h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Страна обменного пункта</h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1 style={{ opacity: "0.5" }}>ОАЭ</h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
                style={{ backgroundColor: "#46464B" }}
              >
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Наличные направления </h1>
                </div>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>Возможны </h1>
                  <h1 style={{ opacity: "0.5" }}>Не возможны</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.infoPage__mainContainer__moreInfo}>
          <div className={style.infoPage__mainContainer__moreInfo__box}>
            <h1 className={style.infoPage__mainContainer__infoBox__header}>
              Отзывы
            </h1>
            <div className={style.infoPage__mainContainer__moreInfo__box__text}>
              <h1>В русскоязычной версии</h1>
              <h1 style={{ opacity: "0.5" }}>7003</h1>
            </div>
            <div
              className={style.infoPage__mainContainer__moreInfo__box__rating}
            >
              <h1>Рейтинг на MyWOT</h1>
              <div
                className={
                  style.infoPage__mainContainer__moreInfo__box__rating__element
                }
              >
                <h1 style={{ opacity: "0.5", textDecoration: "underline" }}>
                  3.0
                </h1>
                <StarRatings
                  rating={3}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="3px"
                />
              </div>
            </div>
          </div>
          <div className={style.infoPage__mainContainer__moreInfo__box}>
            <h1 className={style.infoPage__mainContainer__infoBox__header}>
              Ссылки
            </h1>
            <div
              className={style.infoPage__mainContainer__moreInfo__box__text2}
            >
              <h1>Ссылка (рус)</h1>
              <h1 style={{ opacity: "0.5", textDecoration: "underline" }}>
                www.bestchange.ru
              </h1>
            </div>
            <div
              className={style.infoPage__mainContainer__moreInfo__box__text2}
            >
              <h1>Ссылка на файл с курсами</h1>
              <h1 style={{ opacity: "0.5", textDecoration: "underline" }}>
                www.bestchange.ru
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
