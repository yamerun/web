import React from "react";
import style from "./ChangePass.module.scss";
import axios from "axios";
export default function ChangePassword() {
  const [active, setActive] = React.useState(false);
  const [newPass, setNewPass] = React.useState("");
  const [newPassConfirm, setNewPassConfirm] = React.useState("");
  const [message,setMessage] = React.useState('')
  const ChangePass = () => {
    setActive(!active);
  };
  const ChangeValuePassword = ({ value }) => {
    setNewPass(value);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  const ChangePassword = () => {
    axios
      .post(
        "https://change.pro/api/user/change_password",
        {
          password: newPass,
          password_confirmation: newPassConfirm,
        },
        config
      )
      .then(function (response) {
        setMessage(response.data.message);
      }).catch(function(error){
        setMessage(error.message);
      });
  };
  const ChangeValueConfirmPassword = ({ value }) => {
    setNewPassConfirm(value);
  };
  return (
    <div className={style.NewPass}>
      <div>
        <button onClick={ChangePass} className={style.NewPass__button}>
          Изменить пароль
        </button>
        {active && (
          <div className={style.NewPass__box}>
            <input
              onChange={(e) => ChangeValuePassword(e.target)}
              className={style.NewPass__input}
              placeholder="новый пароль"
              required
            />
            <input
              onChange={(e) => ChangeValueConfirmPassword(e.target)}
              className={style.NewPass__input}
              placeholder="подтвердите пароль"
              required
            />
            <button className={style.NewPass__btn} onClick={ChangePassword} />
          </div>
        )}
      </div>
      <span style={{color:'white'}}>{message}</span>
    </div>
  );
}
