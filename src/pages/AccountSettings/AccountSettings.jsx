import axios from "axios";
import style from "./Account.module.scss";
import { useLoaderData } from "react-router-dom";

import React from "react";
export default function AccountSettings() {
  const { item } = useLoaderData();
  const SettingsParams = React.lazy(() =>
    import("../../components/SettingsParams/SettingsParams")
  );
  const ChangePassword = React.lazy(()=>import('../../components/AccountChangePassword/AccountChangePassword'))
  
  return (
    <div className={style.AccountSettings}>
      <div className={style.AccountSettings__box}>
        <h1 className={style.AccountSettings__box__name}>
          Настройки Аккаунта: {item.data.name}
        </h1>
        <div className={style.AccountSettings__box__settings}>
        <React.Suspense fallback={<h1>...loading</h1>}>
          <SettingsParams
            item={item}
          />
        </React.Suspense>
        <React.Suspense fallback={<h1>...loading</h1>}>
          <ChangePassword
            item={item}
          />
        </React.Suspense>
        </div>

      </div>
    </div>
  );
}
