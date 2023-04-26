import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import style from "./forPartners.module.scss";
import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import axios from "axios";
export const ForPartners = () => {
  const [data, setData] = useState("");
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/content/page_partners`)
      .then(function (response) {
        setData(response.data.data.description);
      });
  }, []);

  return (
    <div className={style.forPartners}>
      <Header />
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <div className={style.forPartners__textbox}>
        <p className={style.forPartners__textbox__text}>{data}</p>
      </div>
      <Footer />
    </div>
  );
};
