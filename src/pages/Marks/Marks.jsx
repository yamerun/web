import React, { useMemo, useEffect, useState, useCallback } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import style from "./Marks.module.scss";
import img from "../../assets/imgs/iconsRed.png";
import img2 from "../../assets/imgs/icons8pencill.png";
import img3 from "../../assets/imgs/icons8green.png";
import { useNavigate } from "react-router-dom";
import { setEchangerMarks } from "../../store/itemsSlice/itemsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { MarkPop } from "../../components/MarksPop/MarksPop";
export const ExchangerMarks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [succsess, setSuccess] = useState(false);
  const { exchangerMarks } = useSelector((state) => ({
    exchangerMarks: state.itemsSlice.exchangerMarks,
  }));
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/marks/get`, config)
      .then(function (response) {
        dispatch(setEchangerMarks(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
    if (succsess === true) {
      axios
        .get(`http://146.59.87.222/api/marks/get`, config)
        .then(function (response) {
          dispatch(setEchangerMarks(response.data.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => setSuccess(false);
  }, [succsess]);

  const columns = [
    {
      Header: "Дата обновления",
    },
    {
      Header: "Направление обмена",
    },
    {
      Header: "Метка",
    },
    {
      Header: "Действия",
    },
  ];

  useEffect(() => {
    if (isExchangerRole === false) {
      navigate("/");
    }
  }, [isExchangerRole]);

  const opn = () => {
    setActive(!active);
  };

  const deleteMark = (id) => {
    axios
      .delete(`http://146.59.87.222/api/marks/delete?id=${id}`, config)
      .then(function (response) {
        setSuccess(true);
      })
      .then(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={style.ExchangerMarks}>
      <Header />
      <ExchangerAccountNavigation />
      {active && <MarkPop prop={opn} setSuccess={setSuccess} />}
      <div className={style.ExchangerMarks__tableBox}>
        <div className={style.ExchangerMarks__tableBox__table}>
          <div className={style.ExchangerMarks__tableBox__table__header}>
            <button
              onClick={opn}
              className={style.ExchangerMarks__tableBox__table__btn}
            >
              Добавить метку
            </button>
          </div>
          <ul className={style.ExchangerMarks__tableBox__table__nav}>
            {columns.map((item) => (
              <li>{item.Header}</li>
            ))}
          </ul>
          <div className={style.ExchangerMarks__tableBox__table__body}>
            {exchangerMarks.length !== 0 ? (
              exchangerMarks.map((item) => (
                <div
                  className={
                    style.ExchangerMarks__tableBox__table__body__content
                  }
                >
                  <div
                    className={
                      style.ExchangerMarks__tableBox__table__body__content__box
                    }
                  >
                    <p>{item.updated_at.date}</p>
                    <p>{item.updated_at.time}</p>
                  </div>
                  <div
                    className={
                      style.ExchangerMarks__tableBox__table__body__content__box
                    }
                  >
                    <p>
                      {item.from}&#8594;{item.to}
                    </p>
                  </div>
                  <div
                    className={
                      style.ExchangerMarks__tableBox__table__body__content__box
                    }
                  >
                    <p>{item.type.description}</p>
                  </div>
                  <div>
                    <img src={img} onClick={() => deleteMark(item.id)} />
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
