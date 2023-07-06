import React, { useEffect, useState } from "react";
import style from "./Marks.module.scss";
import { useDispatch } from "react-redux";
import { setTooltip } from "../../store/itemsSlice/itemsSlice";
export const Marks = ({ prop }) => {
  const dispatch = useDispatch();
  const [resultArr, setresultArr] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [active, setActive] = useState(false);
  const item = document.querySelector(`.${style.container}`);
  const ShowTip = ({ id }) => {
    setCurrentIndex(id);

    item.classList.add(`${style.openTool}`);
  };

  const hideTips = () => {
    setCurrentItem(undefined);
    setCurrentIndex(undefined);
    item.classList.remove(`${style.openTool}`);
  };

  useEffect(() => {
    if (prop != undefined) {
      setresultArr(
        prop.map((item) => ({
          id: item.id,
          description: item.description,
        }))
      );
    }
  }, [prop]);

  useEffect(() => {
    if (currentIndex != undefined && resultArr != undefined) {
      setCurrentItem(resultArr.filter((item) => item.id == currentIndex));
    }
  }, [currentIndex, resultArr]);

  return (
    <div className={style.container}>
      <div className={style.variants}>
        {prop.map((item) => (
          <div onMouseEnter={() => ShowTip(item)} key={item.id}>
            <img
              src={`https://change.pro${item.icon.path}`}
              className={style.img}
              id={item.id}
            />
          </div>
        ))}
      </div>
      {currentItem !== undefined &&
        currentItem.map((item) => (
          <div className={style.tooltip} onMouseLeave={hideTips}>
            <h1>{item.description}</h1>
          </div>
        ))}
    </div>
  );
};
