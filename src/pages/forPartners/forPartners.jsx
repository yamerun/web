import React, { useEffect, useState, useRef } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import style from "./forPartners.module.scss";
import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import axios from "axios";
export const ForPartners = () => {
  const [data, setData] = useState("");
  const [form, setForm] = useState([]);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

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

  useEffect(() => {
    /* axios
      .get(`http://146.59.87.222/api/forms/get?page=forPartners`)
      .then(function (response) {
        setForm(response.data.data);
      });*/
  }, []);

  const OpenForm = () => {
    setActive(!active);
  };

  const sendForm = (e) => {
    console.log(e.target.id);
    axios
      .get(`http://146.59.87.222/api/forms/set`, {})
      .then(function (response) {
        setData(response.data.data.description);
      });
  };
  console.log(form);

  return (
    <div className={style.forPartners}>
      <Header />
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <div className={style.forPartners__textbox}>
        <p className={style.forPartners__textbox__text}>{data}</p>
      </div>
      {form.length != 0 &&
        form.map((item) => (
          <div className={style.forPartners__form}>
            <button
              className={style.forPartners__form__btn}
              onClick={(e) => sendForm(e)}
              id={item.id}
            >
              {item.button_title}
            </button>
            <input
              required={item.fields[0].is_required}
              id={item.fields[0]}
              placeholder={item.fields[0].name}
              className={style.forPartners__form__input}
            />
            <input
              required={item.fields[1].is_required}
              id={item.fields[1]}
              placeholder={item.fields[1].name}
              className={style.forPartners__form__input}
            />
            <input
              required={item.fields[2].is_required}
              id={item.fields[2]}
              placeholder={item.fields[2].name}
              type={item.fields[2].type}
              className={style.forPartners__form__input}
            />
          </div>
        ))}
      <Footer />
    </div>
  );
};
