import React from "react";
import style from "./SettingParams.module.scss";
import img from "../../assets/imgs/settings.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SettingsParams({ item }) {
  const navigate = useNavigate();
  const [active, setActive] = React.useState({
    name: false,
    email: false,
    num: false,
    telegram: false,
  });

  const [message, setMessage] = React.useState("");

  const [newValues, setNewValues] = React.useState({
    name: item.data.name,
    email: item.data.email,
    phone: item.data.phone,
    telegram: item.data.telegram,
  });

  const handleChangeValue = (id) => {
    setActive({
      name: id === "name",
      email: id === "email",
      phone: id === "phone",
      telegram: id === "telegram",
    });
  };

  const handleChangeInputVal = (e) => {
    setNewValues({ ...newValues, [e.target.name]: e.target.value });
  };

  const handleSendRequest = () => {
    axios
      .post("https://change.pro/api/user/edit", newValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(function (response) {
        setMessage(response.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className={style.AccountSettings__settings}>
      {[
        { id: "name", label: "Имя", value: newValues.name },
        { id: "email", label: "Почта", value: newValues.email },
        { id: "phone", label: "Телефон", value: newValues.phone },
        { id: "telegram", label: "Телеграм", value: newValues.telegram },
      ].map((setting) => (
        <div
          key={setting.id}
          className={style.AccountSettings__settings__item}
          onClick={() => handleChangeValue(setting.id)}
        >
          {active[setting.id] ? (
            <div className={style.AccountSettings__settings__newSetInputBox}>
              <input
                name={setting.id}
                value={setting.value}
                onChange={handleChangeInputVal}
                placeholder={`${setting.label}`}
                className={style.AccountSettings__settings__input}
              />
              <p className={style.AccountSettings__settings__input__tip}>
                {" "}
                &#129040; Задайте новое поле {setting.label} для вашего аккаунта
              </p>
            </div>
          ) : (
            <h1>{`${setting.label}: ${setting.value}`}</h1>
          )}
          <img
            src={img}
            id={setting.id}
            className={style.AccountSettings__settings__item__img}
            onClick={() => handleChangeValue(setting.id)}
          />
        </div>
      ))}
      <span>{message}</span>
      <button
        onClick={handleSendRequest}
        className={style.AccountSettings__settings__saveBtn}
      />
    </div>
  );
}
