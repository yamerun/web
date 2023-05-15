import React, { useState, useEffect, useRef } from "react";
import style from "./Notflications.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
export const Notflications = () => {
  var currentDate = new Date();
  const { currentFrom, currentTo, isFilltersClear } = useSelector((state) => ({
    currentFrom: state.itemsSlice.currentFrom,
    currentTo: state.itemsSlice.currentTo,
    isFilltersClear: state.itemsSlice.isFilltersClear,
  }));
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState([]);
  const [outValue, setOutValue] = useState("");
  const [reserveValue, setReserveValue] = useState("");
  const [active, setActive] = useState(false);
  const [timeValue, setTimeValue] = useState("");
  const [timeTitle,setTimeTitle] = useState('');
  const [error,setError] = useState('');
   const [success ,setSuccess] = useState('')

  useEffect(() => {
    axios
      .get(
        `https://change.pro/api/exchangers/currencies/get?orderBy=out&sort=desc&limit=1&from=${currentFrom}&to=${currentTo}`
      )
      .then(function (response) {
        setCourse(response.data.data);
      
      }).catch(function(error){
      
      })
  }, [currentFrom, currentTo]);

  const ChangeOutValue = (e) => {
    setOutValue(e.target.value);
  };

  const ChangeReserveValue = (e) => {
    setReserveValue(e.target.value);
  };
  const ChangeEmailValue = (e) => {
    setEmail(e.target.value);
  };

  const openSelect = () => {
    setActive(!active);
  };

  const changeDateTo6hourse = ({textContent}) => {
    setTimeValue(currentDate.setHours(currentDate.getHours() + 6));
    setActive(false);
    setTimeTitle(textContent)
  };
  const changeDateTo12hourse = ({textContent}) => {
    setTimeValue(currentDate.setHours(currentDate.getHours() + 12));
    setActive(false);
    setTimeTitle(textContent)
  };
  const changeDateTo24hourse = ({textContent}) => {
    setTimeValue(currentDate.setHours(currentDate.getHours() + 24));
    setActive(false);
    setTimeTitle(textContent)
  };
  const changeDateTo1Weekhourse = ({textContent}) => {
    setTimeValue(currentDate.setDate(currentDate.getDate() + 7));
    setActive(false);
    setTimeTitle(textContent)
  };
  const changeDateTo1Mounth = ({textContent}) => {
    setTimeValue(currentDate.setMonth(currentDate.getMonth() + 1));
    setActive(false);
    setTimeTitle(textContent)
  };
  const changeDateTo3Mounth = ({textContent}) => {
    setTimeValue(currentDate.setMonth(currentDate.getMonth() + 3));
    setActive(false);
    setTimeTitle(textContent)
  };

  const CreateNotflication = () => {
    axios
      .post(`https://change.pro/api/notifications/create`, {
        from: currentFrom,
        to: currentTo,
        min_value: outValue === "" ? Math.floor(course[0].out) : outValue,
        amount:reserveValue === "" ? Math.floor(course[0].amount) : reserveValue,
        date_expiration: timeValue,
        contact: email,
        contact_type: "email",
      })
      .then(function (response) {
        setError('');
        setSuccess(`Уведомоление отправлено на ${email}`)
      }).catch(function(error) {
        setError(error.response.data.message);
        setSuccess('')
      })
  };

  return (
    <div className={style.Notflication}>
      <div>
        <div className={style.Notflication__row}>
          <p>Выслать уведомление на E-MAIL:</p>{" "}
          <input onChange={(e) => ChangeEmailValue(e)} />
        </div>
        <div className={style.Notflication__row}>
          <p>Обмен курсом менее:</p>{" "}
          <input
            onChange={(e) => ChangeOutValue(e)}
            placeholder={course.length !== 0 && Math.floor(course[0].out)}
          />
        </div>
        <div className={style.Notflication__row}>
          <p>И доступным резервом не меннее:</p>{" "}
          <input
            onChange={(e) => ChangeReserveValue(e)}
            placeholder={course.length !== 0 && Math.floor(course[0].amount)}
          />
          <p>
            {currentTo} за 1 {currentFrom}
          </p>
        </div>
        <div className={style.Notflication__row}>
          <p>Заявка будет аннулирована через:</p>{" "}
          <div>
            <h1 onClick={openSelect}>{timeTitle !== '' ? `${timeTitle}` : 'Выбрать'}</h1>
            {active && (
              <nav className={style.Notflication__timevariants}>
                <ul>
                  <li onClick={(e)=>changeDateTo6hourse(e.target)}>6 часов</li>
                  <li onClick={(e)=>changeDateTo12hourse(e.target)}>12 часов</li>
                  <li onClick={(e)=>changeDateTo24hourse(e.target)}>24 часа</li>
                  <li onClick={(e)=>changeDateTo1Weekhourse(e.target)}>Неделя</li>
                  <li onClick={(e)=>changeDateTo1Mounth(e.target)}>Месяц</li>
                  <li onClick={(e)=>changeDateTo3Mounth(e.target)}>3 месяца</li>
                </ul>
              </nav>
            )}
          </div>
        </div>
        <button className={style.Notflication__btn} onClick={CreateNotflication}>подать заявку</button>
        {
        error !== '' ? (<h1  className={style.Notflication__error}>{error}</h1>) : (<h1 className={style.Notflication__success}>{success}</h1>)
        }
      </div>
    </div>
  );
};
