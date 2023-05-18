import style from "./PersonalAccount.module.scss";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Partners } from "../../components/Partners/Partners";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoginStatus } from "../../store/itemsSlice/itemsSlice";
import { useEffect } from "react";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { setUserRole } from "../../store/userAccountSlice/AccountSlice";
import { setItemId } from "../../store/userAccountSlice/AccountSlice";
import { Link } from "react-router-dom";

export const AccountLoader = async () => {
  const key = localStorage.getItem("jwt");
  if (key) {
    const res = await fetch(`https://change.pro/api/user/get`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const item = await res.json();
        localStorage.setItem("userRole", item.data.role.code);
        localStorage.setItem("userId", item.data.exchanger_id);
    return { item };
  } else window.location.href = '/';
};


export const PersonalAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { item } = useLoaderData();
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");

  const handleSelect = (e) => {
    const btnElements = document.querySelectorAll(
      `.${style.PersonalAccount__container__leftBar__navigation__list__item}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
  };
  useEffect(() => {
    if (jwt && role !== null && role === "exchanger") {
      dispatch(setUserRole(true));
    } else dispatch(setUserRole(false));
  }, [jwt, role]);

  const LogOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userRole");
    navigate('/')
  };


  return (
    <div className={style.PersonalAccount}>
      <div className={style.PersonalAccount__container}>
        <div className={style.PersonalAccount__container__leftBar}>
          <nav
            className={style.PersonalAccount__container__leftBar__navigation}
          >
            <h1 className={style.PersonalAccount__container__leftBar__userName}>
              {item.data.name}
            </h1>
            <ul
              className={
                style.PersonalAccount__container__leftBar__navigation__list
              }
            >
              <li
                className={
                  style.PersonalAccount__container__leftBar__navigation__list__item
                }
                onClick={(e) => handleSelect(e)}
              >
                Мой кабинет
              </li>
              <li
                className={
                  style.PersonalAccount__container__leftBar__navigation__list__item
                }
                onClick={(e) => handleSelect(e)}
              >
                Список операций
              </li>
              <li
                className={
                  style.PersonalAccount__container__leftBar__navigation__list__item
                }
                onClick={(e) => handleSelect(e)}
              >
                История посещений обменников
              </li>
              <Link
                className={
                  style.PersonalAccount__container__leftBar__navigation__list__item
                }
                onClick={(e) => handleSelect(e)}
                to='/accountReviews'
              >
                Мои отзывы
              </Link>
              <li className={style.PersonalAccount__logOut} onClick={LogOut}>
                Выйти из Аккаунта
              </li>
            </ul>
          </nav>
        </div>
        <div className={style.PersonalAccount__container__rightBar}>
          <div className={style.PersonalAccount__container__userStatistics}>
            <div
              className={style.PersonalAccount__container__rightBar__userInfo}
            >
              <div
                className={
                  style.PersonalAccount__container__rightBar__userInfo__box
                }
              >
                <h1
                  className={
                    style.PersonalAccount__container__rightBar__userInfo__box__header
                  }
                >
                  Всего обменял на сумму:
                </h1>
                <h1
                  className={
                    style.PersonalAccount__container__rightBar__userInfo__box__header2
                  }
                >
                  13212313
                </h1>
              </div>
              <div
                className={
                  style.PersonalAccount__container__rightBar__userInfo__box
                }
              >
                <h1
                  className={
                    style.PersonalAccount__container__rightBar__userInfo__box__header
                  }
                >
                  Любимая валюта
                </h1>
                <h1
                  className={
                    style.PersonalAccount__container__rightBar__userInfo__box__header2
                  }
                >
                  BTC
                </h1>
              </div>
            </div>
            <div
              className={
                style.PersonalAccount__container__rightBar__userInfo__box
              }
            >
              <h1 style={{ color: "white" }}>Курс любимых валют</h1>
              <h1 style={{ color: "white" }}>Обменять →</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={style.PersonalAccount__container__bottom}>
        <div className={style.PersonalAccount__container__bottom__controlls}>
          <h1 className={style.PersonalAccount__container__bottom__header}>
            Рекомендации Change.pro
          </h1>
          <h1 className={style.PersonalAccount__container__bottom__navigation}>
            Смотреть все →
          </h1>
        </div>
        <Partners />
      </div>
    </div>
  );
};
