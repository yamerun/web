import React, { useMemo, useEffect, useState } from "react";
import style from "./ExchangerCourses.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export const CoursesLoader = async () => {
  const key = localStorage.getItem("jwt");
  const id = localStorage.getItem("userId");

  if (key) {
    const res = await fetch(
      `https://change.pro/api/exchangers/currencies/get?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    const data = await res.json();
    return { data, id };
  } else {
    window.location.href = "/changePro";
  }
};

export const ExchangerCourses = () => {
  const [data, setData] = useState([]);
  const items = useLoaderData();

  useEffect(() => {
    if (Array.isArray(items.data)) {
      const formattedData = items.data.map((item) => ({
        name: `${item.from} → ${item.to}`,
        course: `${Math.floor(item.in)} → ${item.out}`,
        reserve: item.reserve,
        minsum: item.minamount,
        maxsum: item.maxamount,
      }));
      setData(formattedData);
    } else {
      setData([]);
    }
  }, [items]);

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className={style.ExchangerCourses}>
      <div className={style.tableBox}>
        <h1 className={style.ExchangerCourses__header}>
          Загруженные курсы обмена
        </h1>
        <table {...getTableProps()} className={style.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className={style.tableNav}
                    key={column.Header}
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
                <tr {...row.getRowProps()} key={row.index}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={style.tableCell}
                        key={cell.value}
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
    </div>
  );
};
