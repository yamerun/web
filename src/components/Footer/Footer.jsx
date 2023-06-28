import React from "react";
import style from "./Footer.module.scss";
import logo from "../../assets/imgs/logo.svg";
import img1 from "../../assets/imgs/yt.svg";
import img2 from "../../assets/imgs/vk.svg";
import img3 from "../../assets/imgs/tg.svg";
import img4 from "../../assets/imgs/hz.svg";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();
  const gotomain = () => {
    navigate("/");
  };
  return (
    <>
      <button onClick={scrollUp} className={style.Footer__box__btn}>
        Вверх ↑
      </button>
      <div className={style.Footer}>
        <div className={style.Footer__container}>
          <div className={style.Footer__box}>
            <img src={logo} onClick={gotomain} />
            <h3 className={style.Footer__box__info}>©2023 Change.Pro</h3>
            <div className={style.Footer__box__info__infoBox}>
              <h3 className={style.Footer__box__info__infoBox__link}>
                Условия{" "}
              </h3>
              <h3 className={style.Footer__box__info__infoBox__link2}>и </h3>
              <h3 className={style.Footer__box__info__infoBox__link}>
                Конфиденциальность
              </h3>
            </div>
          </div>
          <div className={style.Footer__box}>
            <div className={style.Footer__box__icons}>
              <img src={img1} className={style.Footer__box__icons__icon} />
              <img src={img2} className={style.Footer__box__icons__icon} />
              <img src={img3} className={style.Footer__box__icons__icon} />
              <img src={img4} className={style.Footer__box__icons__icon} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
