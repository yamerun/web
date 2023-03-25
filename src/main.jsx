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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/:id",
    element: <ItemPage />,
    loader:exchangeLoader,
  },
  {
    path: "/account",
    element: <PersonalAccount/>,
   
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
