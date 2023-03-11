import React from "react";
import style from './Navigation.module.scss'
export const Navigation = ({props}) => {
 
  return (
    <nav className={style.Navigation}>
      <ul className={style.Navigation__items}>
        {props.map((item) => (
          <li className={style.Navigation__item}>{item}</li>
        ))}
      </ul>
    </nav>
  );
};
