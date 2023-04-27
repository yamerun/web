import React from "react";
import style from "./Article.module.scss";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { useLoaderData } from "react-router-dom";
export const Articlepage = () => {
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const {article} = useLoaderData()
  console.log(article)
  return (
    <div className={style.Article}>
      <Header />
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <div className={style.Article__container}>

      </div>
      <Footer />
    </div>
  );
};
