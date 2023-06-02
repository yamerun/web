import React from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ExchangerAccountNavigation } from "../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setUserRole } from "../store/userAccountSlice/AccountSlice";
import { useNavigate } from "react-router-dom";
import './layout.css'
export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  const [isAuthInPersonallAccount, setIsAuthInPersonallAccount] =
    React.useState("");
  const [isAuthOnSite, setIsAuthOnSite] = React.useState("");
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));

  const configForSiteAuth = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("siteJwt")}`,
    },
  };

  const configForSiteUser = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  React.useEffect(() => {
    if (isAuthInPersonallAccount === true && role === "exchanger") {
      dispatch(setUserRole(true));
    } else dispatch(setUserRole(false));
  }, [isAuthInPersonallAccount, role]);

  React.useEffect(() => {
    axios
      .post("https://change.pro/api/auth/check", {}, configForSiteAuth)
      .then(function (response) {
        setIsAuthOnSite(response.data.data.is_auth);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .post("https://change.pro/api/auth/check", {}, configForSiteUser)
      .then(function (response) {
        setIsAuthInPersonallAccount(response.data.data.is_auth);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [jwt]);

  React.useEffect(() => {
    axios
      .get("https://change.pro/api/user/get", {}, configForSiteUser)
      .then(function (response) {
        localStorage.setItem("userRole", response.data.role.code);
        localStorage.setItem("userId", response.data.exchanger_id);
      });
  }, []);

  React.useEffect(() => {
    if (isAuthOnSite === false) {
      navigate("/");
      localStorage.removeItem("siteJwt");
    }
    if (isAuthInPersonallAccount === false) {
      localStorage.removeItem("jwt");
    }
  }, [isAuthOnSite, isAuthInPersonallAccount]);


  return (
    <div className='Layout'>
      <Header />
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <Outlet />
      <Footer />
    </div>
  );
}
