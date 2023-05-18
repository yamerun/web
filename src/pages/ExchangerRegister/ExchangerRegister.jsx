import React from "react";
import style from "./ExchangerRegister.module.scss";
import img from "../../assets/imgs/logo.svg";

const ExchangerRegisterForm = React.lazy(() =>
  import("../../components/ExchangerRegisterForm/ExchangerREgisterForm")
);

export const ExchangerRegisterPage = () => {
  return (
    <div className={style.Register}>
      <div className={style.Register__container}>
        <img src={img} />
        <h1 className={style.Register__container__title}>
          Регистрация обменнника
        </h1>
        <React.Suspense
          fallback={
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              ...Loading
            </h1>
          }
        >
          <ExchangerRegisterForm />
        </React.Suspense>
      </div>
    </div>
  );
};
