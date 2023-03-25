import React from "react";
import style from "./Calculator.module.scss";
import { useSelector } from "react-redux";
export const Calculator = () => {


  return (
    <div className={style.Calculator}>
      <div className={style.Calculator__container}>
        <div className={style.Calculator__radiobtn}>
          <div className={style.Calculator__radiobtn__radio}>
            <input id="1" type="radio" name="g" />
            <label for="1">Получаете</label>
          </div>
          <div
            className={style.Calculator__checkboxControlls__separation}
          ></div>
          <div className={style.Calculator__radiobtn__radio}>
            <input id="2" type="radio" name="g" />
            <label for="2">Отдаёте</label>
          </div>
        </div>
        <div className={style.Calculator__inputControlls}>
          <div className={style.Calculator__inputControlls__fields}>
            <input className={style.Calculator__inputControlls__fieldInput} />
            <input
              className={style.Calculator__inputControlls__fieldValue}
              value="DOGE"
              disabled
            />
          </div>
          <input
            className={style.Calculator__inputControlls__field2}
            value="Без комиссий ПС"
          />
          <button className={style.Calculator__inputControlls__btn}>
            Рассчитать
          </button>
        </div>
      </div>
    </div>
  );
};
