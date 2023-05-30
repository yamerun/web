import React, { useEffect, useState } from "react";
import style from "./InfoPage.module.scss";

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
  if (key) {
    const getInfo = await fetch("https://change.pro/api/user/get", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const item = await getInfo.json();
    let item2 = null;
    if (Object.keys(item).length !== 0) {
      const getExchanger = await fetch(
        `https://change.pro/api/exchangers/get?exchanger_id=${item.data.exchanger_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      item2 = await getExchanger.json();
    }
    return { item, item2 };
  } else {
    window.location.href = "/changePro";
    return null;
  }
};

export const InfoPage = () => {
  const navigate = useNavigate();
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  const { item } = useLoaderData();
  const { item2 } = useLoaderData();
  const [isListing, setIsListing] = useState(item2.data.is_in_listing);
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
        `https://change.pro/api/exchangers/edit`,
        {
          exchanger_id: item.data.exchanger_id,
          is_in_listing: isListing,
        },
        config
      )
      .then(function (response) {});
  }, [isListing]);

  const openChangeUrlValue = (e) => {
    setChangeUrl(!changeUrl);
  };

  const postUrl = () => {
    setChangeUrl(!false);
    axios
      .post(
        `https://change.pro/api/exchangers/edit`,
        {
          exchanger_id: item.data.exchanger_id,
          referal_url: urlVal,
        },
        config
      )
      .then(function (response) {
        setnewUrl(response.data.data.referal_url);
        setChangeUrl(false)
      });
  };

  const changeUrlValue = (e) => {
    setUrlVal(e.target.value);
  };

  return (
    <div className={style.infoPage}>
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
                <h1
                  style={{ textDecoration: "underline" }}
                  onClick={() => changeListing()}
                  className={
                    style.infoPage__mainContainer__infoBox__items__item__headers
                  }
                >
                  {isListing == true ? "Выключить" : "Включить"}
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
                  <h1 style={{ color: "#FE0000" }}>{item2.data.error_rates}</h1>
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
                  ${item2.data.sum_reserves}
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
                  {item2.data.age}
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
                  {" "}
                  {item2.data.rates_update != null && (
                    <>
                      {" "}
                      за {item2.data.rates_update.time} /{" "}
                      {item2.data.rates_update.date}
                    </>
                  )}
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
                  {item2.data.country}
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
                  {item2.data.rating}
                </h1>
                <StarRatings
                  rating={item2.data.rating}
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
              <a style={{ opacity: "0.5", textDecoration: "underline",color:'#a2a2a3' }} href={item2.data.site_url}>
                {item2.data.site_url}
              </a>
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
                  <a style={{ opacity: "0.5", textDecoration: "underline",color:'#a2a2a3' }} href={newUrl != "" ? newUrl : item2.data.referal_url}>
                    {newUrl != "" ? newUrl : item2.data.referal_url}
                  </a>
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
    </div>
  );
};
