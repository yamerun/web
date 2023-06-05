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

  const ShowTip = ({ id }) => {
    setCurrentIndex(id);
  };

  const hideTips = () => {
    setCurrentItem(undefined);
    setCurrentIndex(undefined);
  };

  const Open = () => {
    setActive(true);
  };

  const Close = () => {
    setActive(false);
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
    <div className={style.container} onMouseEnter={Open} onMouseLeave={Close}>
      {active && (
        <div className={style.variants}>
          {prop.map((item) => (
            <div
              onMouseEnter={() => ShowTip(item)}
              onMouseLeave={() => hideTips(item)}
              key={item.id}
            >
              <img
                src={`https://change.pro${item.icon.path}`}
                className={style.img}
                id={item.id}
              />
            </div>
          ))}
        </div>
      )}
      {currentItem !== undefined &&
        currentItem.map((item) => (
          <div className={style.tooltip}>
            <h1>{item.description}</h1>
          </div>
        ))}
    </div>
  );
};
