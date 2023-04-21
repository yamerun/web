import React, { useMemo, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import style from "./ExchangerCourses.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTable } from "react-table";

export const ExchangerCourses = () => {
  const navigate = useNavigate();
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (isExchangerRole === false) {
      navigate("/");
    }
  }, [isExchangerRole])
  const data = [
    {
      name: "Binance USD (BUSD) → QIWI RUB ",
      course: "1 → 75.7800",
      comission: "0,67%",
      reserve: "1 825 655",
      mincom: "-",
      dopcom: "-",
      minsum: "65.28",
      maxsum: "2985.56",
      type: "Авто",
      place: "6",
      update: "6 сек",
    },
    {
      name: "Binance USD (BUSD) →QIWI RUB ",
      course: "1 → 75.7800",
      comission: "0,67%",
      reserve: "1 825 655",
      mincom: "-",
      dopcom: "-",
      minsum: "65.28",
      maxsum: "2985.56",
      type: "Авто",
      place: "6",
      update: "6 сек",
    },
    {
      name: "Binance USD (BUSD) →QIWI RUB ",
      course: "1 → 75.7800",
      comission: "0,67%",
      reserve: "1 825 655",
      mincom: "-",
      dopcom: "-",
      minsum: "65.28",
      maxsum: "2985.56",
      type: "Авто",
      place: "6",
      update: "6 сек",
    },
    {
      name: "Binance USD (BUSD) →QIWI RUB ",
      course: "1 → 75.7800",
      comission: "0,67%",
      reserve: "1 825 655",
      mincom: "-",
      dopcom: "-",
      minsum: "65.28",
      maxsum: "2985.56",
      type: "Авто",
      place: "6",
      update: "6 сек",
    },
    {
      name: "Binance USD (BUSD) →QIWI RUB ",
      course: "1 → 75.7800",
      comission: "0,67%",
      reserve: "1 825 655",
      mincom: "-",
      dopcom: "-",
      minsum: "65.28",
      maxsum: "2985.56",
      type: "Авто",
      place: "6",
      update: "6 сек",
    },
    {
      name: "Binance USD (BUSD) →QIWI RUB ",
      course: "1 → 75.7800",
      comission: "0,67%",
      reserve: "1 825 655",
      mincom: "-",
      dopcom: "-",
      minsum: "65.28",
      maxsum: "2985.56",
      type: "Авто",
      place: "6",
      update: "6 сек",
    },
    {
      name: "Binance USD (BUSD) →QIWI RUB ",
      course: "1 → 75.7800",
      comission: "0,67%",
      reserve: "1 825 655",
      mincom: "-",
      dopcom: "-",
      minsum: "65.28",
      maxsum: "2985.56",
      type: "Авто",
      place: "6",
      update: "6 сек",
    },
  ];
  const columns = useMemo(
    () => [
      {
        Header: "Направление обмена",
        accessor: "name",
      },
      {
        Header: "Курс",
        accessor: "course",
      },
      {
        Header: "Комиссия",
        accessor: "comission",
      },
      {
        Header: "Резерв",
        accessor: "reserve",
      },
      {
        Header: "Мин.ком.",
        accessor: "mincom",
      },
      {
        Header: "Доп.ком.",
        accessor: "dopcom",
      },
      {
        Header: "Мин.сум.",
        accessor: "minsum",
      },

      {
        Header: "Макс.сум.",
        accessor: "maxsum",
      },
      {
        Header: "Тип",
        accessor: "type",
      },
      {
        Header: "Место",
        accessor: "place",
      },
      {
        Header: "Обновления",
        accessor: "update",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className={style.ExchangerCourses}>
      <Header />
      <ExchangerAccountNavigation />
      <div className={style.tableBox}>
        <h1 className={style.ExchangerCourses__header}>
          Загруженные курсы обмена
        </h1>
        <table {...getTableProps()} className={style.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className={style.tableNav}>
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
                      <td {...cell.getCellProps()} className={style.tableCell}>
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
