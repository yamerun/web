import React from "react";
import style from "./Partners.module.scss";

export const Partners = () => {
  return (
    <div className={style.Partners}>
      <div className={style.Partners__column}>
        <div className={style.Partners__column__box}></div>
        <div className={style.Partners__column__box}></div>
        <div className={style.Partners__column__box}></div>
        <div className={style.Partners__column__box}></div>
        <div className={style.Partners__column__box}></div>
      </div>
      <div className={style.Partners__column}>
        <div className={style.Partners__column__box}></div>
        <div className={style.Partners__column__box}></div>
        <div className={style.Partners__column__box}></div>
        <div className={style.Partners__column__box}></div>
        <div className={style.Partners__column__box}></div>
      </div>
    </div>
  );
};
