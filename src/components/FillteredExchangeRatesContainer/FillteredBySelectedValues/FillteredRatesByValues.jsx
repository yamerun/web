import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Marks } from "../../Marks/Marks";
import style from "./FillteredExchange.module.scss";
import img from "../../../assets/imgs/green-circle.svg";
import img1 from "../../../assets/imgs/red-circle.svg";

const EmptyCourses = React.lazy(() =>
  import("../../EmptyCourses/EmptyCourses")
);
export default function FillteredBySelectedValues({ itemExchangeRates }) {
  const navigate = useNavigate();
  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", setDimension);
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const goToItemPage = ({ id }) => {
    navigate(`/exchanger/${id}`);
  };

  return itemExchangeRates.length === 0 ? (
    <React.Suspense fallback={<h1>loading</h1>}>
      <EmptyCourses />
    </React.Suspense>
  ) : (
    <tbody className={style.table}>
      {itemExchangeRates.map((item) => (
        <tr className={style.table__row}>
          <td className={style.table__row__box}>
            <div className={style.table__row__box__exchanger}>
              <button
                onClick={() => goToItemPage(item.exchanger)}
                className={style.table__row__box__exchangerinfo}
              />
              <p onClick={() => openItemSite(item.exchanger.site_url)}>
                {item.exchanger.name}
              </p>
            </div>
          </td>
          <td className={style.table__row__box}>
            <div className={style.table__row__flexbox}>
              <p>{(Math.round(item.in * 100) / 100).toFixed(2)}</p>
              <p className={style.table__row__box__smalltext}>{item.from}</p>
            </div>
          </td>
          <td className={style.table__row__box}>
            <div className={style.table__row__flexbox}>
              <p
                className={
                  style.Fillters__categories__body__content__to__header
                }
              >
                {(Math.round(item.out * 100) / 100).toFixed(2)}
              </p>
              <p className={style.table__row__box__smalltext}>{item.to}</p>
            </div>
          </td>
          <td className={style.table__row__box}>
            <p>{(Math.round(item.amount * 100) / 100).toFixed(2)}</p>
          </td>
          <td className={style.table__row__box}>
            <p>
              {item.exchanger.user_reviews} ({item.exchanger.count_reviews})
            </p>
          </td>
          <td className={style.table__row__box}>
            <img
              className={style.table__row__img}
              src={item.exchanger.status.title === "Работает" ? img : img1}
            ></img>
          </td>
          {screenSize.dynamicWidth >= 1050 && (
            <td className={style.table__row__box}>
              <div className={style.marksBox}>
                {item.marks.length != 0
                  ? item.marks.map((item) => <Marks prop={item} />)
                  : "✖"}
              </div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
