import React, { useState, useEffect, useMemo, useCallback } from "react";
import style from "./Markspop.module.scss";
import axios from "axios";
import { Checkbox } from "../CheckBoxes/Checkbox";
export const MarkPop = ({ prop, setSuccess }) => {
  const [marks, setMarks] = useState([]);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [searchResult, setResult] = useState([]);
  const [searchresult2, setResult2] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variants2, setVariants2] = useState([]);
  const [from, setfrom] = useState("");
  const [to, setTo] = useState("");
  const [mark, setMark] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(`https://change.pro/api/marks/types`, config)
      .then(function (response) {
        setMarks(response.data.data);
      });
  }, []);

  const getFromValue = (e) => {
    setValue(e.target.value);
  };

  const getToValue = (e) => {
    setValue2(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://change.pro/api/exchangers/currencies/list`)
      .then(function (response) {
        setVariants(response.data.data);
      })
      .catch(function (error) {});
  }, []);

  useEffect(() => {
    axios
      .get(`https://change.pro/api/exchangers/currencies/list`)
      .then(function (response) {
        setVariants2(response.data.data);
      })
      .catch(function (error) {});
  }, []);

  useEffect(() => {
    setResult(
      variants.filter((item) =>
        item.currency.toLowerCase().includes(value.toLocaleLowerCase())
      )
    );
  }, [value, variants]);

  useEffect(() => {
    setResult2(
      variants2.filter((item) =>
        item.currency.toLowerCase().includes(value2.toLocaleLowerCase())
      )
    );
  }, [value2, variants2]);

  const setFromValue = (e) => {
    setfrom(e.target.textContent);
    setResult([]);
  };

  const setToValue = (e) => {
    setTo(e.target.textContent);
    setResult2([]);
  };

  const getMark = (e) => {
    setMark(e.target.id);
    const btnElements = document.querySelectorAll(
      `.${style.Marks__content__body__item}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
  };

  const data = {
    from: from,
    to: to,
    type_id: mark,
  };

  const addToMark = () => {
    axios
      .post(`https://change.pro/api/marks/create`, data, config)
      .then(function (response) {
        setSuccess(true);
      })
      .catch(function (error) {});
    prop();
  };

  const closePop = useCallback(() => {
    prop();
  }, []);

  return (
    <div className={style.Marks}>
      <div className={style.Marks__content}>
        <div className={style.Marks__content__header}>
          <div className={style.Marks__content__header__box}>
            <input
              className={style.Marks__content__header__input}
              placeholder="from"
              onChange={(e) => getFromValue(e)}
            />
            {value.length && searchResult.length != 0 && (
              <div className={style.Marks__content__header__variants}>
                {searchResult.map((item) => (
                  <p onClick={(e) => setFromValue(e)}>{item.currency}</p>
                ))}
              </div>
            )}
          </div>
          <div className={style.Marks__content__header__box}>
            <input
              className={style.Marks__content__header__input}
              placeholder="to"
              onChange={(e) => getToValue(e)}
            />
            {value2.length && searchresult2.length != 0 && (
              <div className={style.Marks__content__header__variants}>
                {searchresult2.map((item) => (
                  <p onClick={(e) => setToValue(e)}>{item.currency}</p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={style.Marks__content__body}>
          {marks.map((item) => (
            <div key={item.id} className={style.Marks__content__body__boxItem}>
              <img
                src={`https://change.pro${item.icon.path}`}
                className={style.Marks__content__body__img}
              />
              <p
                className={style.Marks__content__body__item}
                id={item.id}
                onClick={(e) => getMark(e)}
              >
                {item.id}: {item.description}
              </p>
            </div>
          ))}
        </div>
        <div></div>
        <div className={style.Marks__content__footer}>
          <button
            onClick={addToMark}
            className={style.Marks__content__footer__addBtn}
          >
            Добавить метку
          </button>
          <button
            onClick={closePop}
            className={style.Marks__content__footer__abort}
          >
            отмена
          </button>
        </div>
      </div>
    </div>
  );
};
