import React from "react";
import style from "./MainPage.module.scss";
import { SearchMenu } from "../../components/SearchMenu/SearchMenu";
import { Carousel } from "../../components/Advertisement/Carousel";
import { Fillters } from "../../components/Fillters/Fillters";
import { Article } from "../../components/Article/Article";

export const MainPage = () => {
  const NavProps = ["Список", "Популярное"];
  return (
    <div className={style.MainPage}>
      <div className={style.MainPage__containerMenu}>

          <SearchMenu />

        <div className={style.MainPage__rightMenu}>
          <Carousel />
          <Fillters />
          <Article />
        </div>
      </div>
    </div>
  );
};
