import React from "react";
import { Link } from "react-router-dom";
import { Marks } from "../../Marks/Marks";
import style from "./FillteredExchange.module.scss";
const EmptyCourses = React.lazy(() =>
  import("../../EmptyCourses/EmptyCourses")
);
export default function FillteredBySelectedValues({ itemExchangeRates }) {
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

  return itemExchangeRates.length === 0 ? (
    <React.Suspense fallback={<h1>loading</h1>}>
      <EmptyCourses />
    </React.Suspense>
  ) : (
    <>
      {itemExchangeRates.map((item) => (
        <div className={style.FillteredVallues__content}>
          <div className={style.FillteredVallues__content__excahange}>
            <Link
              to={`/ExchangerPage/${item.exchanger.id}`}
              className={style.FillteredVallues__content__excahange__btn}
            />
            <p
              className={style.FillteredVallues__content__excahange__header}
              onClick={() => openItemSite(item.exchanger.site_url)}
            >
              {item.exchanger.name}
            </p>
          </div>
          {item.marks.length != 0 && <Marks prop={item.marks} />}
          <div className={style.FillteredVallues__content__from}>
            {screenSize.dynamicWidth < 630 && (
              <p className={style.FillteredVallues__content__from__header}>
                Отдаете:
              </p>
            )}
            <p className={style.FillteredVallues__content__from__header}>1</p>
            <p className={style.FillteredVallues__content__from__header2}>
              {item.from}
            </p>
          </div>
          <div className={style.FillteredVallues__content__to}>
            {screenSize.dynamicWidth < 630 && (
              <p className={style.FillteredVallues__content__to__header}>
                Получаете:
              </p>
            )}
            <p className={style.FillteredVallues__content__to__header}>
              {(Math.round(item.out * 100) / 100).toFixed(2)}
            </p>
            <p className={style.FillteredVallues__content__to__header2}>
              {item.to}
            </p>
          </div>
          <div className={style.FillteredVallues__content__reserve}>
            {screenSize.dynamicWidth < 630 && (
              <p className={style.FillteredVallues__content__to__header}>
                Резерв:
              </p>
            )}
            <p className={style.FillteredVallues__content__reserve__header}>
              {(Math.round(item.amount * 100) / 100).toFixed(2)}
            </p>
          </div>
          <div className={style.FillteredVallues__content__comment}>
            {screenSize.dynamicWidth < 630 && (
              <p className={style.FillteredVallues__content__to__header}>
                Комментарии:
              </p>
            )}
            <div className={style.FillteredVallues__content__comment__headers}>
              <p className={style.FillteredVallues__content__comment__header}>
                {item.exchanger.user_reviews}
              </p>
              <p
                className={style.FillteredVallues__content__comment__header}
                style={{
                  color: item.exchanger.count_reviews == 0 && "red",
                }}
              >
                ({item.exchanger.count_reviews})
              </p>
            </div>
          </div>
          <div className={style.FillteredVallues__content__status}>
            {screenSize.dynamicWidth < 630 && (
              <p className={style.FillteredVallues__content__to__header}>
                Статус:
              </p>
            )}
            <p
              className={style.FillteredVallues__content__status__header}
              style={{
                color:
                  item.exchanger.status.title === "Работает" ? "green" : "red",
              }}
            >
              {item.exchanger.status.title}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
