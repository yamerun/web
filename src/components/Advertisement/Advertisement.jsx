import React from "react";
import style from "./Advertisement.module.scss";

export const Advertisement = () => {
  return (
    <div className={style.adds}>
      <div className={style.adds__box}>
        <h1 style={{ marginLeft: "10px", color: "white" }}>
          Здесь могла бы быть ваша реклама
        </h1>
      </div>
      <div className={style.adds__box}>
        <h1 style={{ marginLeft: "10px", color: "white" }}>
          Здесь могла бы быть ваша реклама
        </h1>
      </div>
      <div className={style.adds__box}>
        <h1 style={{ marginLeft: "10px", color: "white" }}>
          Здесь могла бы быть ваша реклама
        </h1>
      </div>
    </div>
  );
};