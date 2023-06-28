import React from "react";
import axios from "axios";
import style from "./SubscribeDetail.module.scss";

export default function SubscribeDetail() {
  const [subs, setSubs] = React.useState([]);
  const configForSiteUser = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  React.useEffect(() => {
    axios
      .get("https://change.pro/api/exchangers/get_subscribe", configForSiteUser)
      .then(function (response) {
        setSubs(response.data.data);
      });
  }, []);

  function createMarkup(content) {
    return { __html: `${content}` };
  }

  const goToPay = (item) => {
    window.location.open = `${item}`;
  };

  return (
    <div className={style.subscribe}>
      <h1 className={style.subscribe__heading}>ПОДПИСКА</h1>
      <div className={style.subscribe__container}>
        <article className={style.subscribe__container__block}>
          {subs !== undefined && subs.content !== undefined ? (
            <>
              <div
                className={style.subscribe__container__block__heading}
                dangerouslySetInnerHTML={createMarkup(subs.content.warning)}
              ></div>
              <h1>{subs.subscribe_date_expiration.time}</h1>
              <h1>{subs.subscribe_date_expiration.date}</h1>

              <div
                className={style.subscribe__container__text}
                dangerouslySetInnerHTML={createMarkup(subs.content.instruction)}
              ></div>
              <button
                className={style.subscribe__container__block__btn}
                onClick={goToPay(subs.content.url_to_pay)}
              >
                Оплатить
              </button>
            </>
          ) : (
            <div></div>
          )}
        </article>
      </div>
    </div>
  );
}
