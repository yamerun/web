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
      .get(`http://146.59.87.222/api/content/page_partners`)
      .then(function (response) {
        setData(response.data.data.description);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/forms/get?page=forPartners`)
      .then(function (response) {
        setForm(response.data.data);
      });
  }, []);

  const sendForm = (id) => {
    setFinalRes(formData.filter((obj) => obj.form_id == id));
    setFormId(id)
  };
  
  useEffect(() => {
    if (finalRes.length === 0) {
      return;
    }
    axios.post("http://146.59.87.222/api/forms/set", {
      form_id: formId,
      result: finalRes.map((item) => ({
        field_id: item.id,
        field_value: item.value,
      })),
    }).then(function (response) {});
  }, [finalRes,formId]);
  
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
      <Footer />
    </div>
  );
            }
/*    <input
              required={item.fields[1].is_required}
              id={item.fields[1].id}
              placeholder={item.fields[1].name}
              className={style.forPartners__form__input}
            />
            <input
              required={item.fields[2].is_required}
              placeholder={item.fields[2].name}
              id={item.fields[2].id}
              type={item.fields[2].type}
              className={style.forPartners__form__input}
            />*/
