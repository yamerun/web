import React, { useState } from "react";
import axios from "axios";
import style from "./ScammersPop.module.scss";
import { useCallback } from "react";

export const ScammersPop = ({ props, setUpdate }) => {
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState("");
  const [walletId, setWalletId] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [variants, setVariants] = useState([]);
  const [active, setActive] = useState(false);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeContacts = (e) => {
    setContacts(e.target.value);
  };
  const changeWalletId = (e) => {
    setWalletId(e.target.value);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  const data = {
    scam_name: name,
    scam_email: contacts,
    scam_wallet: walletId,
    scam_type_id: type,
    scam_description: description,
  };

  const sendNewScamInfo = () => {
    axios
      .post(`http://146.59.87.222/api/scammers/create`, data, config)
      .then(function (response) {
        setUpdate(true);
        props(false);
      });
  };
  const changeType = (e) => {
    setType(e.target.id);
    setActive(false);
  };

  const getSelectVariants = () => {
    axios
      .get(`http://146.59.87.222/api/scammers/types`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(function (response) {
        setVariants(response.data.data);
      });
    setActive(!active);
  };

  const close = useCallback(() => {
    props(false);
  }, []);

  return (
    <div className={style.Modal} style={{ height: `${window.outerHeight}` }}>
      <div className={style.Modal__container}>
        <div className={style.Modal__container__header}>
          <h1 className={style.Modal__container__header__tittle}>
            Новая запись
          </h1>
          <button
            className={style.Modal__container__header__btn}
            onClick={close}
          ></button>
        </div>
        <div className={style.Modal__container__inputMenu}>
          <div className={style.Modal__container__inputBox}>
            <h1>Имя</h1>
            <input
              className={style.Modal__container__inputBox__input}
              onChange={(e) => changeName(e)}
            />
          </div>
          <div className={style.Modal__container__inputBox}>
            <h1>Email</h1>
            <input
              className={style.Modal__container__inputBox__input}
              onChange={(e) => changeContacts(e)}
            />
          </div>
          <div className={style.Modal__container__inputBox}>
            <h1>Кошелек</h1>
            <input
              className={style.Modal__container__inputBox__input}
              onChange={(e) => changeWalletId(e)}
            />
          </div>

          <div className={style.Modal__container__inputBox}>
            <h1>Тип</h1>
            <div
              onClick={getSelectVariants}
              className={style.Modal__container__inputBox__input}
            >
              {type}
            </div>
            {active && (
              <ul className={style.Modal__variants}>
                {variants.map((item) => (
                  <li onClick={(e) => changeType(e)} key={item.id} id={item.id}>
                    {item.type}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={style.Modal__container__inputBox}>
            <h1>Описание</h1>
            <textarea
              className={style.Modal__container__inputBox__textarea}
              onChange={(e) => changeDescription(e)}
            />
          </div>
          <button
            className={style.Modal__container__btn}
            onClick={sendNewScamInfo}
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};
