import React, { useMemo, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { useTable } from "react-table";
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
  const [data, setData] = useState({});
  const [active,setActive] = useState(false)
  const { exchangerMarks } = useSelector((state) => ({
    exchangerMarks: state.itemsSlice.exchangerMarks,
  }));

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
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Дата обновления",
        accessor: "date",
      },
      {
        Header: "Направление обмена",
        accessor: "side",
      },
      {
        Header: "Метка",
        accessor: "mark",
      },
      {
        Header: "Действия",
        accessor: "actions",
      },
    ],
    []
  );

  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (isExchangerRole === false) {
      navigate("/");
    }
  }, [isExchangerRole]);

  console.log(exchangerMarks);
const opn = ()=> {
  setActive(!active)
}
  return (
    <div className={style.ExchangerMarks}>
      <Header />
      <ExchangerAccountNavigation />
      {
        active && (<MarkPop/>)
      }
      <div className={style.ExchangerMarks__tableBox}>
        <div className={style.ExchangerMarks__tableBox__table}>
          <div className={style.ExchangerMarks__tableBox__table__header}>
            <button onClick={ opn}>Добавить метку</button>
          </div>
          <div className={style.ExchangerMarks__tableBox__table__body}>
            {exchangerMarks.length !== 0 ? (
              exchangerMarks.map((item) => (
                <div className={style.ExchangerMarks__tableBox__table__body__content}>
                  <div className={style.ExchangerMarks__tableBox__table__body__content__box}>
                    <p>{item.updated_at.date}</p>
                    <p>{item.updated_at.time}</p>
                  </div>
                  <div className={style.ExchangerMarks__tableBox__table__body__content__box}>
                    <p>
                      {item.from}&#8594;{item.to}
                    </p>
                  </div>
                  <div className={style.ExchangerMarks__tableBox__table__body__content__box}>
                    <p>{item.type.description}</p>
                  </div>
                  <div>
                    <img src={img}/>
                    <img src={img2}/>
                    <img src={img3}/>
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

/* {
      date: "16.03.2023,16:57",
      side: "Binance USD (BUSD) → Сбербанк RUB ",
      mark: "Ручной обмен",
      reserve: "1 825 655",
      actions: (
        <div>
          {" "}
          <img src={img} /> <img src={img2} /> <img src={img3} />{" "}
        </div>
      ),
    },
    {
      date: "16.03.2023,16:57",
      side: "Binance USD (BUSD) → Сбербанк RUB ",
      mark: "Ручной обмен",
      reserve: "1 825 655",
      actions: (
        <div>
          {" "}
          <img src={img} /> <img src={img2} /> <img src={img3} />{" "}
        </div>
      ),
    },
    {
      date: "16.03.2023,16:57",
      side: "Binance USD (BUSD) → Сбербанк RUB ",
      mark: "Ручной обмен",
      reserve: "1 825 655",
      actions: (
        <div>
          {" "}
          <img src={img} /> <img src={img2} /> <img src={img3} />{" "}
        </div>
      ),
    },
    {
      date: "16.03.2023,16:57",
      side: "Binance USD (BUSD) → Сбербанк RUB ",
      mark: "Ручной обмен",
      reserve: "1 825 655",
      actions: (
        <div>
          {" "}
          <img src={img} /> <img src={img2} /> <img src={img3} />{" "}
        </div>
      ),
    },
    {
      date: "16.03.2023,16:57",
      side: "Binance USD (BUSD) → Сбербанк RUB ",
      mark: "Ручной обмен",
      reserve: "1 825 655",
      actions: (
        <div>
          {" "}
          <img src={img} /> <img src={img2} /> <img src={img3} />{" "}
        </div>
      ),
    },
    {
      date: "16.03.2023,16:57",
      side: "Binance USD (BUSD) → Сбербанк RUB ",
      mark: "Ручной обмен",
      reserve: "1 825 655",
      actions: (
        <div>
          {" "}
          <img src={img} /> <img src={img2} /> <img src={img3} />{" "}
        </div>
      ),
    },
    {
      date: "16.03.2023,16:57",
      side: "Binance USD (BUSD) → Сбербанк RUB ",
      mark: "Ручной обмен",
      reserve: "1 825 655",
      actions: (
        <div>
          {" "}
          <img src={img} /> <img src={img2} /> <img src={img3} />{" "}
        </div>
      ),
    },*/
