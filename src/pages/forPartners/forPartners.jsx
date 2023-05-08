import React, { useEffect, useState, useRef, useCallback } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import style from "./forPartners.module.scss";
import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import axios from "axios";

export const ForPartners = () => {
  const [data, setData] = useState("");
  const [form, setForm] = useState([]);
  const [formData, setFormData] = useState([]);
  const [finalRes, setFinalRes] = useState([]);
  const [formId, setFormId] = useState(null);
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const ref = useRef(null);
  useEffect(() => {
    axios
      .get(`https://change.pro/api/content/page_partners`)
      .then(function (response) {
        setData(response.data.data.description);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://change.pro/api/forms/get?page=forPartners`)
      .then(function (response) {
        setForm(response.data.data);
      });
  }, []);

  const sendForm = (id) => {
    setFinalRes(formData.filter((obj) => obj.form_id == id));
    setFormId(id);
  };

  useEffect(() => {
    if (finalRes.length === 0) {
      return;
    }
    axios
      .post("https://change.pro/api/forms/set", {
        form_id: formId,
        result: finalRes.map((item) => ({
          field_id: item.id,
          field_value: item.value,
        })),
      })
      .then(function (response) {});
  }, [finalRes, formId]);

  const changeInputVal = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    let formsId = e.target.parentNode.id;
    setFormData((prevState) => {
      const index = prevState.findIndex((obj) => obj.id === id);
      if (index === -1) {
        return [...prevState, { form_id: formsId, value: value, id: id }];
      } else {
        return [
          ...prevState.slice(0, index),
          { form_id: formsId, value: value, id: id },
          ...prevState.slice(index + 1),
        ];
      }
    });
  };

  return (
    <div className={style.forPartners}>
      <Header />
      <div  className={style.forPartners__container}>
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <div className={style.forPartners__textbox}>
        <p className={style.forPartners__textbox__text}>{data}</p>
      </div>
      {form.length != 0 &&
        form.map((item) => (
          <div className={style.forPartners__form} id={item.id}>
            <button
              className={style.forPartners__form__btn}
              onClick={() => sendForm(item.id)}
            >
              {item.button_title}
            </button>
            {item.fields.map((item) => (
              <input
                required={item.is_required}
                id={item.id}
                placeholder={item.name}
                className={style.forPartners__form__input}
                onChange={(e) => changeInputVal(e)}
              />
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};
