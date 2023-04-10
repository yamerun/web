import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import "./assets/styles/Common.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ItemPage } from "./pages/itemPage/itemPage";
import { exchangeLoader } from "./pages/itemPage/itemPage";
import { PersonalAccount } from "./pages/PersonalAccount/PersonalAccount";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/Register";
import { AccountLoader } from "./pages/PersonalAccount/PersonalAccount";
import { AllEchangers } from "./pages/AllExchangersPage/AllEchangers";
import { exchangersLoader } from "./pages/AllExchangersPage/AllEchangers";
import { Articles } from "./pages/Articles/Article";
import { ForPartners } from "./pages/forPartners/forPartners";
import { Articlepage } from "./pages/ArticlePage/ArticlePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/:id",
    element: <ItemPage />,
    loader: exchangeLoader,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/account",
    element: <PersonalAccount />,
    loader: AccountLoader,
  },
  {
    path: "/exchangers",
    element: <AllEchangers />,
    loader: exchangersLoader,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/help",
    element: <ForPartners />,
  },
  {
    path: "/forPartners",
    element: <ForPartners />,
  },
  {
    path: "/articlepage",
    element: <Articlepage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
