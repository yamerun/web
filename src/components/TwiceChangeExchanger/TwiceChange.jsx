import React from "react";
import { useSelector } from "react-redux";
import style from "./TwiceChange.module.scss";

export default function TwiceChanhgeExchanger() {
  const { twiceExchanger } = useSelector((state) => ({
    twiceExchanger: state.itemsSlice.twiceExchanger,
  }));
  return (
    <div className={style.TwiceExchange}>
      {twiceExchanger.length === 0 ? (
        <div></div>
      ) : (
        twiceExchanger.map((item) => (
          <div className={style.TwiceExchange__bar}>
            <div className={style.TwiceExchange__bar__container}>
              <div className={style.TwiceExchange__bar__box}>
                <h1>{item.schema.from.currency}</h1>
                <h1 className={style.TwiceExchange__bar__box__value}>
                  {Math.floor(item.schema.from.value)}
                </h1>
              </div>
              &#8594;
              <div className={style.TwiceExchange__bar__box}>
                <h1>
                  <h1>{item.schema.middle.currency} </h1>
                </h1>
                <h1 className={style.TwiceExchange__bar__box__value}>
                  {Math.floor(item.schema.middle.value)}
                </h1>
              </div>
              &#8594;
              <div className={style.TwiceExchange__bar__box}>
                <h1>
                  <h1>{item.schema.to.currency} </h1>
                </h1>
                <h1 className={style.TwiceExchange__bar__box__value}>
                  {Math.floor(item.schema.to.value)} &#8381;
                </h1>
              </div>
            </div>
            <div className={style.TwiceExchange__bar__box}>
              <h1>{Math.floor(item.schema.amount)}</h1>
              <h1>{item.schema.course}</h1>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
