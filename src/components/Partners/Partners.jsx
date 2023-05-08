import React, { useEffect, useState } from "react";
import style from "./Partners.module.scss";
import axios from "axios";
export const Partners = () => {
  const [partners, setPartners] = useState("");

  useEffect(() => {
    axios
      .get(`https://change.pro/api/partners/get`)
      .then(function (response) {
        setPartners(response.data.data);
      })
      .catch(function (error) {});
  }, []);
  console.log(partners);
  return (
    <div className={style.Partners}>
      <div className={style.Partners__column}>
        {partners.length !== 0 &&
          partners.map((item) => (
            <div>
              <h1 className={style.Partners__column__box} style={{color:'white',fontSize:'16px'}}>name:{item.name},id:{item.id}</h1>         
            </div>
          ))}
      </div>
    </div>
  );
};

/*style={{
              backgroundImage: `${item.logo.path}`,
              backgroundRepeat: "none",
              backgroundSize: "100%",
            }}*/
