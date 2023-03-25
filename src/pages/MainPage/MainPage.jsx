import React from "react";
import style from "./MainPage.module.scss";
import { Header } from "../../components/Header/Header";
import { SearchMenu } from "../../components/SearchMenu/SearchMenu";
import { Navigation } from "../../components/Navigation/Navigation";
import { Advertisement } from "../../components/Advertisement/Advertisement";
import { Fillters } from "../../components/Fillters/Fillters";
import { Article } from "../../components/Article/Article";
import { Footer } from "../../components/Footer/Footer";
export const MainPage = () => {
  const NavProps = ["Таблица", "Список", "Популярное"];

  return (
    <div className={style.MainPage}>
      <Header />
      <div className={style.MainPage__containerMenu}>
        <div className={style.MainPage__leftMenu}>
          <Navigation props={NavProps} />
          <SearchMenu />
        </div>
        <div className={style.MainPage__rightMenu}>
          <Advertisement />
          <Fillters />
          <Article />
        </div>
      </div>
      <Footer />
    </div>
  );
};
