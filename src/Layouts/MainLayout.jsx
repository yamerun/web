import React from "react";
import axios from "axios";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setUserRole } from "../store/userAccountSlice/AccountSlice";
export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  React.useEffect(() => {
    if (jwt !== null && role !== null && role === "exchanger") {
      dispatch(setUserRole(true));
    } else dispatch(setUserRole(false));
  }, [jwt, role]);

  React.useEffect(() => {
    axios
      .post("http://146.59.87.222/api/auth/check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(function (response) {
        setIsAuth(response.data.data.is_auth);
      });
  }, []);

  React.useEffect(() => {
      axios
        .get("https://change.pro/api/user/get", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(function (response) {
          localStorage.setItem("userRole", response.data.role.code);
          localStorage.setItem("userId", response.data.exchanger_id);
        });
  },[]);

  return (
    <div>
      <div>
        <Header />
        {isExchangerRole === true && <ExchangerAccountNavigation />}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
