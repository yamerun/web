import React from "react";
import style from "./ClearAll.module.scss";
import { setCurrentItemFromReducer, setisTwice } from "../../store/itemsSlice/itemsSlice";
import { setCurrentItemToReducer } from "../../store/itemsSlice/itemsSlice";
import { setCalculated } from "../../store/itemsSlice/itemsSlice";
import { useDispatch } from "react-redux";
import { setStatistic } from "../../store/itemsSlice/itemsSlice";
import { setIsFilltersClear } from "../../store/itemsSlice/itemsSlice";
export const ClearAll = () => {
  const dispatch = useDispatch();

  const clearAllFillters = () => {
    dispatch(setCurrentItemFromReducer(undefined));
    dispatch(setCurrentItemToReducer(undefined));
    dispatch(setCalculated(false));
    dispatch(setisTwice(false))
    dispatch(setStatistic([]))
    dispatch(setIsFilltersClear(true))
  };
  return (
    <div className={style.ClearAll}>
      <button className={style.ClearAll__btn} onClick={clearAllFillters}>
        Очистить Фильтры
      </button>
    </div>
  );
};
