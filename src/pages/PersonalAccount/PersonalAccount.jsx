import React from "react";
import style from "./PersonalAccount.module.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserRole } from "../../store/userAccountSlice/AccountSlice";
const AccountNavigation = React.lazy(()=>import('../../components/PersonalAccountNavigation/AccountNavigation'))
const Partners = React.lazy(()=>import('../../components/Partners/Partners'))
export const AccountLoader = async () => {
  const key = localStorage.getItem("jwt");
  if (key) {
    const res = await fetch(`https://change.pro/api/user/get`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const item = await res.json();
    localStorage.setItem("userRole", item.data.role.code);
    localStorage.setItem("userId", item.data.exchanger_id);
    return { item };
  } else window.location.href = "/changePro";
};

export const PersonalAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { item } = useLoaderData();
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt && role !== null && role === "exchanger") {
      dispatch(setUserRole(true));
    } else dispatch(setUserRole(false));
  }, [jwt, role]);

  return (
    <div className={style.PersonalAccount}>
      <div className={style.PersonalAccount__container}>
        <div className={style.PersonalAccount__container__leftBar}>
          <React.Suspense fallback={<h1>...loading</h1>}>
            <AccountNavigation item={item}/>
          </React.Suspense>
        </div>
        <React.Suspense fallback={<h1>...loading</h1>}>
        <Partners/>
      </React.Suspense>
      </div>
    </div>
  );
};

