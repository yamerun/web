import React from "react";
import { useLoaderData } from "react-router-dom";
import style from "./FavoriteExchangers.module.scss";

export const FavoriteExchangersLoader = async () => {
  const key = localStorage.getItem("jwt");
  if (key) {
    const res = await fetch(`https://change.pro/api/user/favorite/exchangers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    const items = await res.json();
    return { items };
  } else window.location.href = "/changePro";
};

export const FavoriteExchangers = () => {
  const { items } = useLoaderData();
  return (
    <div className={style.Favorite}>
      <div className={style.Favorite__container}>
        <table className={style.Favorite__table}>
          <thead className={style.Favorite__table__head}>
            <tr className={style.Favorite__table__headerRow}>
              <th>Имя</th>
              <th>ID</th>
              <th>Ссылка на сайт:</th>
              <th>Кабинет на change pro</th>
            </tr>
          </thead>
          <tbody className={style.Favorite__table__body}>
            {items.data.map((item) => (
              <tr className={style.Favorite__table__body__row}>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{item.id}</p>
                </td>
                <td>
                  <p>{item.site_url}</p>
                </td>
                <td>
                  <a
                    href={`/ExchangerPage/${item.id}`}
                  >{`/ExchangerPage/${item.id}`}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
