import React from "react";
import style from "./Statistics.module.scss";
import img from '../../assets/imgs/buttonOpen.svg'
import { Chart } from "../Chart/Chart";
export const Statistics = () => {
  return (
    <div className={style.statistics}>
      <div  className={style.statistics__container}>
        <div className={style.statistics__container__controlls}>
          <h1 className={style.statistics__container__controlls__header}>График</h1>
         <div  className={style.statistics__container__controlls__btnBox}>
         <button className={style.statistics__container__controlls__btnBox__btn1}>Изменения курса обмена</button>
         <img src={img} className={style.statistics__container__controlls__btnBox__icon}/>
         </div>
        
          <h1 className={style.statistics__container__controlls__header}>за</h1>
          <button className={style.statistics__container__controlls__btn2}>24 часа</button>
          <button className={style.statistics__container__controlls__btn3}>показать</button>
        </div>
        <div><Chart/></div>
      </div>
    </div>
  );
};
