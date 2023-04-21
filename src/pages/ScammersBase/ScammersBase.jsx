import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import style from "./ScammersBase.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../store/userAccountSlice/AccountSlice";
import { Checkbox } from "../../components/CheckBoxes/Checkbox";
export const ScammersBase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  const [checked, setChecked] = useState([false, false, false, false]);

  useEffect(() => {
    if (jwt && role !== null && role === "exchanger") {
      dispatch(setUserRole(true));
    } else dispatch(setUserRole(false));
  }, [jwt, role]);

  useEffect(() => {
    if (isExchangerRole === false) {
      navigate("/");
    }
  }, [isExchangerRole]);

  const handleOnClick = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  return (
    <div className={style.ScammersBase}>
      <Header />
      <ExchangerAccountNavigation />
      <div className={style.ScammersBase__mainContainer}>
        <div className={style.ScammersBase__mainContainer__leftMenu}>
          <h1
            className={style.ScammersBase__mainContainer__leftMenu__pageHeader}
          >
            База мошенников и неадекватов
          </h1>

        </div>
        
        <div className={style.ScammersBase__mainContainer__textContents}>
        <div className={style.ScammersBase__mainContainer__searchMenu}>
          <div
            className={style.ScammersBase__mainContainer__searchMenu__container}
          >
            <div
              className={
                style.ScammersBase__mainContainer__searchMenu__container__inputBox
              }
            >
              <input
                className={
                  style.ScammersBase__mainContainer__searchMenu__container__inputBox__input
                }
                placeholder="Поиск"
              />
              <button
                className={
                  style.ScammersBase__mainContainer__searchMenu__container__inputBox__btn
                }
              />
            </div>
            <div className={style.ScammersBase__mainContainer__checkBoxes}>
              <Checkbox
                label="По имени"
                onClick={() => handleOnClick(0)}
                checked={checked[0]}
              />
              <Checkbox
                label="По контактам"
                onClick={() => handleOnClick(1)}
                checked={checked[1]}
              />
              <Checkbox
                label="По кошельку"
                onClick={() => handleOnClick(2)}
                checked={checked[2]}
              />
              <Checkbox
                label="По описанию"
                onClick={() => handleOnClick(3)}
                checked={checked[3]}
              />
            </div>
          </div>
        </div>
          <div
            className={style.ScammersBase__mainContainer__textContents__headers}
          >
            <button
              className={style.ScammersBase__mainContainer__textContents__btn}
            >
              Добавить запись
            </button>
            <h1
              className={style.ScammersBase__mainContainer__textContents__count}
            >
              Всего записей: 1
            </h1>
          </div>
          <div className={style.ScammersBase__mainContainer__infoContainer}>
            <div
              className={style.ScammersBase__mainContainer__infoContainer__info}
            >
              <h1
                className={
                  style.ScammersBase__mainContainer__infoContainer__info__header
                }
              >
                Инфо
              </h1>
              <div
                className={
                  style.ScammersBase__mainContainer__infoContainer__info__text
                }
              >
                <p style={{opacity:'0.7'}}>№7398 - Неадекват</p>
                <p>Добавил Base-Exchange</p>
              </div>
            </div>
            <div
              className={
                style.ScammersBase__mainContainer__infoContainer__contacts
              }
            >
              <h1
                className={
                  style.ScammersBase__mainContainer__infoContainer__contacts__header
                }
              >
                Контакты и кошельки
              </h1>
              <div
                className={
                  style.ScammersBase__mainContainer__infoContainer__contacts__text
                }
              >
                <p style={{opacity:'0.7'}}>455852103210359655454</p> <p>vas.214@gmail.com</p>{" "}
                <p>57.548.344.165</p>
              </div>
            </div>
            <div
              className={
                style.ScammersBase__mainContainer__infoContainer__description
              }
            >
              <h1
                className={
                  style.ScammersBase__mainContainer__infoContainer__description__header
                }
              >
                Описание
              </h1>
              <p
              style={{opacity:'0.7'}}
                className={
                  style.ScammersBase__mainContainer__infoContainer__description__text
                }
              >
                Lorem ipsum dolor sit amet consectetur. Commodo metus
                molestie.Lorem ipsum dolor sit amet consectetur. Commodo metus
                molestie.Lorem ipsum dolor sit amet consectetur. Commodo metus
                molestie.Lorem ipsum dolor sit amet consectetur. Lorem ipsum
                dolor sit amet consectetur. Commodo metus molestie.Lorem ipsum
                dolor sit amet consectetur.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


/*          <nav
            className={style.ScammersBase__mainContainer__leftMenu__navigation}
          >
            <ul>
              <li
                className={
                  style.ScammersBase__mainContainer__leftMenu__navigation__item
                }
              >
                API для автоматического поиска
              </li>
              <li
                className={
                  style.ScammersBase__mainContainer__leftMenu__navigation__item
                }
              >
                API для автоматического добавления
              </li>
              <li
                className={
                  style.ScammersBase__mainContainer__leftMenu__navigation__item
                }
              >
                Как самостоятельно блокировать фишинговые и мошеннические сайты
              </li>
              <li
                className={
                  style.ScammersBase__mainContainer__leftMenu__navigation__item
                }
              >
                Рекомендации по обработке заявок
              </li>
            </ul>
          </nav>*/