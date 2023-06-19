import React from "react";
import axios from "axios";
import style from "./AddToFavorite.module.scss";


export default function AddToFavorite({itemid}) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  const toggleToFavorite = () => {
    axios
      .post(
        `https://change.pro/api/user/favorite/toggle_exchanger`,
        {
          exchanger_id: itemid,
        },

        config
      )
      .then(function (response, error) {
        console.log(response);
        console.log(error);
      });
  };
  return <button className={style.button} onClick={toggleToFavorite} />;
}
