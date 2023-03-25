import style from "./PersonalAccount.module.scss";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Partners } from "../../components/Partners/Partners";
export const PersonalAccount = () => {
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

  return (
    <div className={style.PersonalAccount}>
      <Header />
      <div className={style.PersonalAccount__container}>
        <div className={style.PersonalAccount__container__leftBar}>
          <nav
            className={style.PersonalAccount__container__leftBar__navigation}
          >
            <h1 className={style.PersonalAccount__container__leftBar__userName}>
              Имя юзера
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
              <li
                className={
                  style.PersonalAccount__container__leftBar__navigation__list__item
                }
                onClick={(e) => handleSelect(e)}
              >
                Мои отзывы
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
       
      <Partners/>
      </div>
      <Footer />
    </div>
  );
};
