import React from "react";
import axios from "axios";
import style from "./AddToFavorite.module.scss";
import img from '../../assets/imgs/favoriteheart.svg';
import imgactive from '../../assets/imgs/heartactive.svg'

export default function AddToFavorite({itemid}) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  };
  const [resp,setResp] = React.useState([])

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
        setResp(response.data)
        console.log(error);
      });
  };

  //is_favorite
  console.log(resp)

  return <button className={style.button} onClick={toggleToFavorite}><img src={resp.is_favorite ? imgactive : img}/></button>;
}
//