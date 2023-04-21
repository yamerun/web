import React, { useMemo, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { useTable } from "react-table";
import style from "./Marks.module.scss";
import img from "../../assets/imgs/iconsRed.png";
import img2 from "../../assets/imgs/icons8pencill.png";
import img3 from "../../assets/imgs/icons8green.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const ExchangerMarks = () => {
  const navigate = useNavigate();
  const data = [
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
  ];
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });


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

  return (
    <div className={style.ExchangerMarks}>
      <Header />
      <ExchangerAccountNavigation />
      <div className={style.ExchangerMarks__tableBox}>
        <h1 className={style.ExchangerMarks__tableBox__header}>Метки</h1>
        <table
          {...getTableProps()}
          className={style.ExchangerMarks__tableBox__table}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className={style.ExchangerMarks__tableBox__tableNav}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={style.ExchangerMarks__tableBox__tableCell}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};
