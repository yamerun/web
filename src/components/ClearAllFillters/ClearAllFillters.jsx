import React from "react";
import style from "./ClearAll.module.scss";
import { setCurrentItemFromReducer } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemToReducer } from "../../store/itemsSlice/itemsSlice";
import { setCalculated } from "../../store/itemsSlice/itemsSlice";
import { useDispatch } from "react-redux";

export const ClearAll = () => {
  const dispatch = useDispatch();

  const clearAllFillters = () => {
    dispatch(setCurrentItemFromReducer(undefined));
    dispatch(setCurrentItemToReducer(undefined));
    dispatch(setCalculated(false));
  };
  return (
    <div className={style.ClearAll}>
      <button className={style.ClearAll__btn} onClick={clearAllFillters}>
        Очистить Фильтры
      </button>
    </div>
  );
};
