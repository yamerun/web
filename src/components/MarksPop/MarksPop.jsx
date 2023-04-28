import React, { useState, useEffect } from "react";
import style from "./Markspop.module.scss";

import axios from "axios";
import { Checkbox } from "../CheckBoxes/Checkbox";
export const MarkPop = () => {
  const checkboxes = [
    { label: "По имени", checked: false },
    { label: "По контактам", checked: false },
    { label: "По кошельку", checked: false },
    { label: "По описанию", checked: false },
  ];
  const [marks, setMarks] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/marks/types`, config)
      .then(function (response) {
        setMarks(response.data.data);
      });
  });
  return (
    <div className={style.Marks}>
      <div className={style.Marks__content}>
        <div className={style.Marks__content__header}>
        <input className={style.Marks__content__header__input} placeholder='from'/>
        <input className={style.Marks__content__header__input} placeholder='to'/>
        </div>

        <div className={style.Marks__content__body}>
          {marks.map((item) => (
            <p className={style.Marks__content__body__item}>
              {item.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
