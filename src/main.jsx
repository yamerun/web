import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import "./assets/styles/Common.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ItemPage } from "./pages/itemPage/itemPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/exchangePage",
    element: <ItemPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
