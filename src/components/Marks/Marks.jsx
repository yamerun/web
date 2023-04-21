import React, { useEffect, useState } from "react";
import img from "../../assets/imgs/change.svg";
import img2 from "../../assets/imgs/payments.svg";
import img3 from "../../assets/imgs/coursesFix.svg";
import img4 from "../../assets/imgs/arrows.svg";
import img5 from "../../assets/imgs/verification.svg";
import img6 from "../../assets/imgs/noOffice.svg";
import img7 from "../../assets/imgs/walletService.svg";
import img8 from "../../assets/imgs/isComission.svg";
import style from "./Marks.module.scss";
import { useDispatch } from "react-redux";
import { setTooltip } from "../../store/itemsSlice/itemsSlice";
export const Marks = () => {
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [active, setActive] = useState(false);

  const descriptions = [
    {
      id: 1,
      text: "Данный обменный пункт работает в ручном или автоматическом режиме.",
    },
    {
      id: 2,
      text: "Данный обменный пункт выплачивает средства через сторонние платежные системы.",
    },
    {
      id: 3,
      text: "Данный обменный пункт фиксирует курс обмена на момент создания зайявки",
    },
    {
      id: 4,
      text: "Данный обменный пункт не фиксирует курс обмена на момент создания заявки",
    },

    {
      id: 5,
      text: "Данный обменный пункт может потребовать верификацию документов клиента или задержать обмен для проверки других данных",
    },
    {
      id: 6,
      text: " Данный обменный пункт не имеет офиса в выбранном городе стоимость курьерской доставки входит в курс обмена ",
    },
    {
      id: 7,
      text: "Сервис кошельков со встроенным обменником необходима регистрация отсутсвует прямой обмен",
    },
    {
      id: 8,
      text: "Указанный курс обмена включает комиссии",
    },
  ];

  const test = descriptions.filter((item) => item.id == 4);

  const ShowTip = (e) => {
    const element = e.target;
    setCurrentIndex(element.id);
    if (currentIndex != undefined) {
      setCurrentItem(descriptions.filter((item) => item.id == currentIndex));
    }
  };

  const hideTips = () => {
    setCurrentItem(undefined);
  };

  const Open = () => {
    setActive(true);
  };

  const Close = () => {
    setActive(false)
  }

  const imgUrls = [
    { url: img, id: 1 },
    { url: img2, id: 2 },
    { url: img3, id: 3 },
    { url: img4, id: 4 },
    { url: img5, id: 5 },
    { url: img6, id: 6 },
    { url: img7, id: 7 },
    { url: img8, id: 8 },
  ];
  return (
    <div className={style.container} onMouseEnter={Open} onMouseLeave={Close}>
      {active && (
        <div className={style.variants}>
          <img
            src={img}
            className={style.img}
            id={1}
            onMouseEnter={(e) => ShowTip(e)}
            onMouseLeave={hideTips}
          />
          <img
            src={img2}
            className={style.img}
            id={2}
            onMouseEnter={(e) => ShowTip(e)}
            onMouseLeave={hideTips}
          />
          <img
            src={img3}
            className={style.img}
            id={3}
            onMouseEnter={(e) => ShowTip(e)}
            onMouseLeave={hideTips}
          />
          <img
            src={img4}
            className={style.img}
            id={4}
            onMouseEnter={(e) => ShowTip(e)}
            onMouseLeave={hideTips}
          />
          <img
            src={img5}
            className={style.img}
            id={5}
            onMouseEnter={(e) => ShowTip(e)}
            onMouseLeave={hideTips}
          />
          <img
            src={img6}
            className={style.img}
            id={6}
            onMouseEnter={(e) => ShowTip(e)}
            onMouseLeave={hideTips}
          />
          <img
            src={img7}
            className={style.img}
            id={7}
            onMouseEnter={(e) => ShowTip(e)}
            onMouseLeave={hideTips}
          />
          <img
            src={img8}
            className={style.img}
            id={8}
            onMouseEnter={(e) => ShowTip(e)}
            onMouseLeave={hideTips}
          />
        </div>
      )}

      {currentItem !== undefined && (
        <div className={style.tooltip}>
          <h1>{currentItem[0].text}</h1>
        </div>
      )}
    </div>
  );
};
