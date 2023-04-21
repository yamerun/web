import React,{useEffect} from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import style from "./ExchangerNotifications.module.scss";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ExchangerNotifications = () => {
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
    <div className={style.Notifications}>
      <Header />
      <ExchangerAccountNavigation />
      <div className={style.Notifications__container}>
        <h1 className={style.Notifications__container__header}>
          Настройка уведомлений
        </h1>
        <div className={style.Notifications__container__options}>
          <div className={style.Notifications__container__options__box}>
            <h1
              className={style.Notifications__container__options__box__header}
            >
              Отправлять уведомления:
            </h1>
            <div  className={style.switchCheckBox}>
              <div className={style.switchCheckBox__container}>
                <div className={style.switch}>
                  <input type="checkbox" id="switch" />
                  <label for="switch"></label>
                </div>

                <h1 className={style.switchCheckBox__container__header}> E-mail: mknap75@gmail.com</h1>
              </div>

              <div className={style.switchCheckBox__container}>
                <div className={style.switch}>
                  <input type="checkbox" id="switch2" />
                  <label for="switch2"></label>
                </div>

                <h1 className={style.switchCheckBox__container__header}>Telegram: @mknap75</h1>
              </div>
            </div>

            <h1
              className={style.Notifications__container__options__box__header2}
            >
              Уведомления в Telegram-группе →
            </h1>
          </div>
          <div className={style.Notifications__container__options__box2}>
          <h1
              className={style.Notifications__container__options__box__header}
            >
              Включите тип уведомлений:
            </h1>
            <div  className={style.switchCheckBox}>
              <div className={style.switchCheckBox__container}>
                <div className={style.switch}>
                  <input type="checkbox" id="switch3" />
                  <label for="switch3"></label>
                </div>

                <h1 className={style.switchCheckBox__container__header}> О недоступности экспортного файла курсов</h1>
              </div>

              <div className={style.switchCheckBox__container}>
                <div className={style.switch}>
                  <input type="checkbox" id="switch4" />
                  <label for="switch4"></label>
                </div>

                <h1 className={style.switchCheckBox__container__header}>О новых отзывах</h1>
              </div>
              <div className={style.switchCheckBox__container}>
                <div className={style.switch}>
                  <input type="checkbox" id="switch5" />
                  <label for="switch5"></label>
                </div>

                <h1 className={style.switchCheckBox__container__header}>О новых комментариях к отзывам</h1>
              </div>
              <div className={style.switchCheckBox__container}>
                <div className={style.switch}>
                  <input type="checkbox" id="switch6" />
                  <label for="switch6"></label>
                </div>

                <h1 className={style.switchCheckBox__container__header}>О новых комментариях к отзывам</h1>
              </div>
            </div>

          </div>
        </div>
        <button className={style.Notifications__container__btn}>Сохранить</button>
      </div>
      <Footer />
    </div>
  );
};
