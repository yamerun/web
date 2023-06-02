import React, { useEffect, useState } from "react";
import style from "./Partners.module.scss";
import axios from "axios";
export default function Partners() {
  const [partners, setPartners] = useState("");

  useEffect(() => {
    axios
      .get(`https://change.pro/api/partners/get`)
      .then(function (response) {
        setPartners(response.data.data);
      })
      .catch(function (error) {});
  }, []);


  return (
    <div className={style.Partners}>
      <div className={style.Partners__column}>
        {partners.length !== 0 &&
          partners.map((item) => (
            <div className={style.Partners__column__box}>
            <h1 className={style.Partners__column__header}>{item.name}</h1>   
             <img src={`https://change.pro/${item.logo.path}`} alt='' className={style.Partners__column__img}/>   
            </div>
          ))}
      </div>
    </div>
  );
};

