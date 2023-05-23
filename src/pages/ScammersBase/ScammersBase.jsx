import React, { useState } from "react";
import style from "./ScammersBase.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../store/userAccountSlice/AccountSlice";
import { CheckboxGroup } from "../../components/CheckBoxes/Checkbox";
import axios from "axios";
import { ScammersPop } from "../../components/ScammersPop/ScammersPop";
export const ScammersBase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isExchangerRole, scammerSearchIndex } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
    scammerSearchIndex: state.ExchangerSlice.scammerSearchIndex,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  const [scammersList, setScammersList] = useState([]);
  const [popActive, setPopActive] = useState(false);
  const [finalResult, setFinalResult] = useState("");
  const [value, setValue] = useState("");
  const [searchResult, setResult] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [update, setUpdate] = useState();
  useEffect(() => {
    if (jwt && role !== null && role === "exchanger") {
      dispatch(setUserRole(true));
    } else dispatch(setUserRole(false));
  }, [jwt, role]);

  useEffect(() => {
    if (isExchangerRole === false) {
      navigate("/");
    }
  }, [isExchangerRole]);

  useEffect(() => {
    if (activeSearch === false) {
      axios
        .get(`https://change.pro/api/scammers/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(function (response) {
          setScammersList(response.data.data);
        });
    }
    if (update === true) {
      axios
        .get(`https://change.pro/api/scammers/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(function (response) {
          setScammersList(response.data.data);
        });
    }
    return () => setUpdate(false);
  }, [activeSearch, update]);

  const openPop = () => {
    setPopActive(!popActive);
  };

  const checkboxes = [
    { label: "По имени", checked: false },
    { label: "По контактам", checked: false },
    { label: "По кошельку", checked: false },
    { label: "По описанию", checked: false },
  ];
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  };
  const setSearchResult = () => {
    setActiveSearch(true);
    axios
      .get(
        `https://change.pro/api/scammers/get?search=${value}&search_field=${finalResult}`,
        config
      )
      .then(function (response) {
        setResult(response.data.data);
      });
  };

  useEffect(() => {
    if (scammerSearchIndex === 0) {
      setFinalResult("name");
    }
    if (scammerSearchIndex === 1) {
      setFinalResult("email");
    }
    if (scammerSearchIndex === 2) {
      setFinalResult("wallet_id");
    }
    if (scammerSearchIndex === 3) {
      setFinalResult("description");
    }
  }, [scammerSearchIndex]);

  const setinputVal = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (activeSearch != false) {
      setScammersList(searchResult);
    }
  }, [activeSearch, searchResult]);

  const ClearFillters = () => {
    setActiveSearch(false);
    setValue("");
  };

  return (
    <div className={style.ScammersBase}>
      <div className={style.ScammersBase__mainContainer}>
        {
          popActive && (<ScammersPop props={setPopActive} setUpdate={setUpdate}/>)
        }
        <div className={style.ScammersBase__mainContainer__leftMenu}>
          <h1
            className={style.ScammersBase__mainContainer__leftMenu__pageHeader}
          >
            База мошенников и неадекватов
          </h1>
        </div>
        <div className={style.ScammersBase__mainContainer__textContents}>
          <div className={style.ScammersBase__mainContainer__searchMenu}>
            <div
              className={
                style.ScammersBase__mainContainer__searchMenu__container
              }
            >
              <div
                className={
                  style.ScammersBase__mainContainer__searchMenu__container__inputBox
                }
              >
                <input
                  className={
                    style.ScammersBase__mainContainer__searchMenu__container__inputBox__input
                  }
                  placeholder="Поиск"
                  onChange={(e) => setinputVal(e)}
                />
                <button
                  className={
                    style.ScammersBase__mainContainer__searchMenu__container__inputBox__btn
                  }
                  onClick={setSearchResult}
                />
              </div>

              <CheckboxGroup checkboxes={checkboxes} />
            </div>
            {activeSearch && (
              <button onClick={ClearFillters} className={style.ClearFillters}>
                очистить поиск
              </button>
            )}
          </div>
          <div className={style.separate}> </div>
          <div
            className={style.ScammersBase__mainContainer__textContents__headers}
          >
            <button
              className={style.ScammersBase__mainContainer__textContents__btn}
              onClick={openPop}
            >
              Добавить запись
            </button>
            <h1
              className={style.ScammersBase__mainContainer__textContents__count}
            ></h1>
          </div>
          <ul className={style.ScammersBase__mainContainer__nav}>
            <div className={style.ScammersBase__mainContainer__nav__box}>
              <li>Инфо</li>
            </div>
            <div className={style.ScammersBase__mainContainer__nav__box}>
              <li>Контакты и кошельки</li>
            </div>
            <div className={style.ScammersBase__mainContainer__nav__box}>
              <li>Описание</li>
            </div>
          </ul>
          <div className={style.ScammersBase__mainContainer__body}>
            {scammersList.map((item) => (
              <div className={style.ScammersBase__mainContainer__infoContainer}>
                <div
                  className={
                    style.ScammersBase__mainContainer__infoContainer__info
                  }
                >
                  <div
                    className={
                      style.ScammersBase__mainContainer__infoContainer__info__text
                    }
                  >
                    <p style={{ opacity: "0.7" }}>
                      {item.name} - {item.type.name}
                    </p>
                    <p>Добавил {item.exchanger.name}</p>
                    <p>
                      создано: {item.created_at.date} {item.created_at.time}
                    </p>
                  </div>
                </div>
                <div
                  className={
                    style.ScammersBase__mainContainer__infoContainer__contacts
                  }
                >
                  <div
                    className={
                      style.ScammersBase__mainContainer__infoContainer__contacts__text
                    }
                  >
                    <p style={{ opacity: "0.7" }}>{item.wallet_id}</p>{" "}
                    <p>{item.email}</p>
                  </div>
                </div>
                <div
                  className={
                    style.ScammersBase__mainContainer__infoContainer__description
                  }
                >
                  <p
                    style={{ opacity: "0.7" }}
                    className={
                      style.ScammersBase__mainContainer__infoContainer__description__text
                    }
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
