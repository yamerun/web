import React, { useEffect } from "react";
import style from "./MainPage.module.scss";
import { Header } from "../../components/Header/Header";
import { SearchMenu } from "../../components/SearchMenu/SearchMenu";
import { Carousel } from "../../components/Advertisement/Carousel";
import { Fillters } from "../../components/Fillters/Fillters";
import { Article } from "../../components/Article/Article";
import { Footer } from "../../components/Footer/Footer";
import { setUserRole } from "../../store/userAccountSlice/AccountSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";

export const MainPage = () => {
  const NavProps = ["Список", "Популярное"];
  return (
    <div className={style.MainPage}>
      <div className={style.MainPage__containerMenu}>
        <div className={style.MainPage__leftMenu}>
          <SearchMenu />
        </div>
        <div className={style.MainPage__rightMenu}>
          <Carousel />
          <Fillters />
          <Article />
        </div>
      </div>
    </div>
  );
};
