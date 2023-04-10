import React, { useEffect, useState, useRef } from "react";
import style from "./Calculator.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
export const Calculator = () => {
   const {  currentTo, currentFrom} =
  useSelector((state) => ({
    calculated:state.itemsSlice.caluclated,
    currentTo: state.itemsSlice.currentTo,
    currentFrom: state.itemsSlice.currentFrom,
  }));
  /*
  const [activeFrom,setActiveFrom] = useState(false)
  const [activeTo,setActiveTo] = useState(false)
  const [calculatedFrom,setCalculatedFrom] = useState('')
  const [calculatedTo,setCalculatedTo] = useState('')

 const ref = useRef(null)
 const ref2 = useRef(null)

  const ChooseFrom = () => {
   setCalculatedFrom(currentFrom)
   console.log(calculatedFrom)

  };

  const ChooseTo = () => {
   setCalculatedTo(currentTo)
   console.log(calculatedTo)
  };*/

  return (
    <div className={style.Calculator}>
      <div className={style.Calculator__container}>
        <div className={style.Calculator__radiobtn}>
          <div className={style.Calculator__radiobtn__radio}>
            <input id="1" type="radio" name="g" />
            <label for="1">Получаете</label>
          </div>
          <div
            className={style.Calculator__checkboxControlls__separation}
          ></div>
          <div className={style.Calculator__radiobtn__radio}>
            <input id="2" type="radio" name="g" />
            <label for="2">Отдаёте</label>
          </div>
        </div>
        <div className={style.Calculator__inputControlls}>
          <div className={style.Calculator__inputControlls__fields}>
            <input className={style.Calculator__inputControlls__fieldInput} type="number" min={1}/>
            <input
              className={style.Calculator__inputControlls__fieldValue}
              disabled
              placeholder={currentFrom}
            />
          </div>
          <button className={style.Calculator__inputControlls__field2}>
            Без комиссий ПС
          </button>
          <button className={style.Calculator__inputControlls__btn}>
            Рассчитать
          </button>
        </div>
      </div>
    </div>
  );
};

/*   useEffect(() => {
      axios
        .get(
          `http://146.59.87.222/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${currentFrom}&to=${currentTo}&limit=50`
        )
        .then(function (response) {
          dispatch(setitemExchangeRatesReducer(response.data.data));
        })
        .then(function (response) {})
        .catch(function (error) {});

      const get = setInterval(() => {
        axios
          .get(
            `http://146.59.87.222/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${currentFrom}&to=${currentTo}&limit=50`
          )
          .then(function (response) {
            dispatch(setitemExchangeRatesReducer(response.data.data));

          })
          .then(function (response) {})
          .catch(function (error) {});
      }, 3000);

    return () => clearInterval(get);
  }, [currentTo, currentFrom]);
*/
