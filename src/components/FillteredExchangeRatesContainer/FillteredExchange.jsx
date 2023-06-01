import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setitemExchangeRatesReducer } from "../../store/itemsSlice/itemsSlice";
import axios from "axios";
const TwiceChanhgeExchanger = React.lazy(() =>
  import("../TwiceChangeExchanger/TwiceChange")
);
const FillteredBySelectedValues = React.lazy(() =>
  import("./FillteredBySelectedValues/FillteredRatesByValues")
);

export default function FillteredExchangeRates() {
  const dispatch = useDispatch();
  const { itemExchangeRates, calculated, currentFrom, currentTo, isTwice } =
    useSelector((state) => ({
      itemExchangeRates: state.itemsSlice.itemExchangeRates,
      calculated: state.itemsSlice.calculated,
      currentFrom: state.itemsSlice.currentFrom,
      currentTo: state.itemsSlice.currentTo,
      isTwice: state.itemsSlice.isTwice,
    }));

  useEffect(() => {
    if (calculated !== true) {
      axios
        .get(
          `https://change.pro/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${currentFrom}&to=${currentTo}&limit=50`
        )
        .then(function (response) {
          dispatch(setitemExchangeRatesReducer(response.data.data));
          console.log(response.data.data);
        })
        .then(function (response) {})
        .catch(function (error) {});
      const get = setInterval(() => {
        axios
          .get(
            `https://change.pro/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${currentFrom}&to=${currentTo}&limit=50`
          )
          .then(function (response) {
            dispatch(setitemExchangeRatesReducer(response.data.data));
          })
          .then(function (response) {})
          .catch(function (error) {});
      }, 3000);

      return () => clearInterval(get);
    }
  }, [currentTo, currentFrom, calculated]);
  

  return isTwice === true ? (
    <React.Suspense
      fallback={
        <h1
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          ...Loading
        </h1>
      }
    >
      <TwiceChanhgeExchanger />
    </React.Suspense>
  ) : (
    <React.Suspense
      fallback={
        <h1
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          ...Loading
        </h1>
      }
    >
      <FillteredBySelectedValues itemExchangeRates={itemExchangeRates} />
    </React.Suspense>
  );
}
