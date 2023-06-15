import React from "react";
import { useSelector } from "react-redux";
import style from "./TwiceChange.module.scss";

export default function TwiceChanhgeExchanger() {
  const { twiceExchanger } = useSelector((state) => ({
    twiceExchanger: state.itemsSlice.twiceExchanger,
  }));
  return twiceExchanger.length === 0 ? (
    <></>
  ) : (
    <tbody className={style.TwiceExchange}>
      {twiceExchanger.map((item) => (
        <tr className={style.TwiceExchange__row}>
          <td className={style.TwiceExchange__bar__box}>
            <h1>
              {item.schema.from.currency} {Math.floor(item.schema.from.value)} →{" "}
              {item.schema.middle.currency}{" "}
              {Math.floor(item.schema.middle.value)} → {item.schema.to.currency}{" "}
              {Math.floor(item.schema.to.value)}
            </h1>
          </td>
          <td className={style.TwiceExchange__bar__box}>
            <h1>{Math.floor(item.schema.amount)}</h1>
          </td>
          <td>
            <h1>{item.schema.course}</h1>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
