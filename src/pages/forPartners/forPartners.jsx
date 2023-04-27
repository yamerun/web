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
  const [inputId, setInputId] = useState(null);
  const [inputId2, setInputId2] = useState(null);
  const [formId,setFormId] = useState(null)
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
    axios
      .get(`http://146.59.87.222/api/forms/get?page=forPartners`)
      .then(function (response) {
        setForm(response.data.data);
      });
  }, []);


  const sendForm = (e) => {
    setFormId(e.target.parentNode.id);
    if (formId != null) {
      axios
      .post(`http://146.59.87.222/api/forms/set`, {
        "form_id": formId,
        "result": [
          {
            "field_id": 1,
            "field_value": value,
          },
          {
            "field_id": 2,
            "field_value": value2,
          },

        ]
      })
      .then(function (response) {
        

      });
    }
   
  };


  const changeInputVal = (e) => {
    setValue(e.target.value);
    setInputId(e.target.id);
  };
  
  const changeInputVal2 = (e) => {
    setValue2(e.target.value);
    setInputId2(e.target.id)
  }


  console.log(inputId);
  console.log(inputId2);
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
              onClick={(e) => sendForm(e)}
            >
              {item.button_title}
            </button>
            <input
              required={item.fields[0].is_required}
              id={item.fields[0].id}
              placeholder={item.fields[0].name}
              className={style.forPartners__form__input}
              onChange={(e) => changeInputVal(e)}
            />
            <input
              required={item.fields[1].is_required}
              id={item.fields[1].id}
              placeholder={item.fields[1].name}
              className={style.forPartners__form__input}
              onChange={(e) => changeInputVal2(e)}
            />
            <input
              required={item.fields[2].is_required}
              placeholder={item.fields[2].name}
              id={item.fields[2].id}
              type={item.fields[2].type}
              className={style.forPartners__form__input}
            />
          </div>
        ))}
      <Footer />
    </div>
  );
};
