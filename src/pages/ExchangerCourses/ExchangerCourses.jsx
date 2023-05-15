import React, { useMemo, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import style from "./ExchangerCourses.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import axios from "axios";
export const ExchangerCourses = () => {
  const navigate = useNavigate();
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (isExchangerRole === false) {
      navigate("/");
    }
  }, [isExchangerRole]);

  useEffect(() => {
    axios
      .get('https://change.pro/api/exchangers/currencies/get?id=1')
      .then(function (response) {
        setData(response.data.data.map((item) => ({
          name: `${item.from} → ${item.to} `,
          course: `${Math.floor(item.in)} → ${item.out}`,
          reserve: `${item.reserve}`,
          minsum: item.minamount,
          maxsum: item.maxamount,
        })));
        console.log(response.data.data)
      })
  }, []);



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
        Header: "Резерв",
        accessor: "reserve",
      },
      {
        Header: "Мин.сум.",
        accessor: "minsum",
      },

      {
        Header: "Макс.сум.",
        accessor: "maxsum",
      },

    ],
    []
  );
  console.log(data)

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
