import React, { useEffect, useState } from "react";
import style from "./InfoPage.module.scss";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import img from "../../assets/imgs/iconsRed.png";
import img2 from "../../assets/imgs/icons8pencill.png";
import img3 from "../../assets/imgs/icons8green.png";

export const infoloader = async () => {
  const key = localStorage.getItem("jwt");
  const id = localStorage.getItem("userId");
  if (key) {
    const res = await fetch(
      `http://146.59.87.222/api/exchangers/get?exchanger_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    const item = await res.json();

    return { item, id };
  } else useNavigate("/login");
};

export const InfoPage = () => {
  const navigate = useNavigate();
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  const { item } = useLoaderData();
  const { id } = useLoaderData();
  const [isListing, setIsListing] = useState(item.data.is_in_listing);
  const [changeUrl, setChangeUrl] = useState(false);
  const [urlVal, setUrlVal] = useState("");
  const [newUrl, setnewUrl] = useState("");
  useEffect(() => {
    if (isExchangerRole === false) {
      navigate("/");
    }
  }, [isExchangerRole]);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  const changeListing = () => {
    if (isListing === true) {
      setIsListing(false);
    }
    if (isListing === false) {
      setIsListing(true);
    }
  };

  useEffect(() => {
    axios
      .post(
        `http://146.59.87.222/api/exchangers/edit`,
        {
          exchanger_id: item.data.id,
          is_in_listing: isListing,
        },
        config
      )
      .then(function (response) {
        console.log(response);
      });
  }, [isListing]);

  const openChangeUrlValue = (e) => {
    setChangeUrl(!changeUrl);
  };

  const postUrl = () => {
    setChangeUrl(!false);
    axios
      .post(
        `http://146.59.87.222/api/exchangers/edit`,
        {
          exchanger_id: item.data.id,
          referal_url: urlVal,
        },
        config
      )
      .then(function (response) {
        setnewUrl(response.data.data.referal_url);
      });
  };

  const changeUrlValue = (e) => {
    setUrlVal(e.target.value);
  };

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
                <h1
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  Обменный пункт
                </h1>
                <h1
                  style={{ opacity: "0.5" }}
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  {item.data.name}
                </h1>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
                style={{ backgroundColor: "#46464B" }}
              >
                <h1
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  Статус в листинге
                </h1>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1
                    style={{ textDecoration: "underline" }}
                    onClick={changeListing}
                  >
                    {isListing === true ? "Выключить" : "Включить"}
                  </h1>
                  <h1 style={{ opacity: "0.5" }}>курсы загружены</h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
              >
                <h1
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  Загружено курсов
                </h1>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1>{item.data.number_rates}</h1>
                  <h1 style={{ opacity: "0.5" }}>
                    для русскоязычной версии мониторинга{" "}
                  </h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
                style={{ backgroundColor: "#46464B" }}
              >
                <h1
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  Ошибочные курсы
                </h1>
                <div
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  <h1 style={{ color: "#FE0000" }}>{item.data.error_rates}</h1>
                  <h1 style={{ opacity: "0.5" }}>курс отклонен </h1>
                </div>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
              >
                <h1
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  Сумма резервов
                </h1>
                <h1
                  style={{ opacity: "0.5" }}
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  ${item.data.sum_reserves}
                </h1>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
                style={{ backgroundColor: "#46464B" }}
              >
                <h1
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  Дата начала работы
                </h1>
                <h1
                  style={{ opacity: "0.5" }}
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  {item.data.age}
                </h1>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
              >
                <h1
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  Экспорт загружен и обработан
                </h1>
                <h1
                  style={{ opacity: "0.5" }}
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  за {item.data.rates_update.time} /{" "}
                  {item.data.rates_update.date}
                </h1>
              </div>
              <div
                className={style.infoPage__mainContainer__infoBox__items__item}
                style={{ backgroundColor: "#46464B" }}
              >
                <h1
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  Страна обменного пункта
                </h1>
                <h1
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                  style={{ opacity: "0.5" }}
                >
                  {item.data.country}
                </h1>
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
              <h1 style={{ opacity: "0.5" }}></h1>
            </div>
            <div
              className={style.infoPage__mainContainer__moreInfo__box__rating}
            >
              <h1>Рейтинг на ChangePro</h1>
              <div
                className={
                  style.infoPage__mainContainer__moreInfo__box__rating__element
                }
              >
                <h1 style={{ opacity: "0.5", textDecoration: "underline" }}>
                  {item.data.rating}
                </h1>
                <StarRatings
                  rating={item.data.rating}
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
                {item.data.site_url}
              </h1>
            </div>
            <div
              className={style.infoPage__mainContainer__moreInfo__box__text2}
            >
              <h1>Ссылка на файл с курсами</h1>
              {changeUrl === true ? (
                <div className={style.infoPage__mainContainer__changeUrl}>
                  <input
                    onChange={(e) => changeUrlValue(e)}
                    className={style.infoPage__mainContainer__changeUrl__input}
                    placeholder="Введите новый URL"
                  />
                  <img
                    onClick={postUrl}
                    className={style.infoPage__mainContainer__changeUrl__btn}
                    src={img3}
                  />
                  <img
                    onClick={openChangeUrlValue}
                    className={style.infoPage__mainContainer__changeUrl__btn}
                    src={changeUrl === true && img}
                  />
                </div>
              ) : (
                <div className={style.infoPage__mainContainer__changeUrl}>
                  <h1 style={{ opacity: "0.5", textDecoration: "underline" }}>
                    {newUrl != "" ? newUrl : item.data.referal_url}
                  </h1>
                  <img
                    onClick={openChangeUrlValue}
                    className={style.infoPage__mainContainer__changeUrl__btn}
                    src={changeUrl === true ? img : img2}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
