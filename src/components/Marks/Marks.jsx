import React, { useEffect, useState, useMemo } from "react";
import img from "../../assets/imgs/change.svg";
import img2 from "../../assets/imgs/payments.svg";
import img3 from "../../assets/imgs/coursesFix.svg";
import img4 from "../../assets/imgs/arrows.svg";
import img5 from "../../assets/imgs/verification.svg";
import img6 from "../../assets/imgs/noOffice.svg";
import img7 from "../../assets/imgs/walletService.svg";
import img8 from "../../assets/imgs/isComission.svg";
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
    if (currentIndex && resultArr != undefined) {
      setCurrentItem(resultArr.filter((item) => item.id == currentIndex));
    }
  };

  const hideTips = () => {
    setCurrentItem(undefined);
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

  console.log(currentItem);

  return (
    <div className={style.container} onMouseEnter={Open} onMouseLeave={Close}>
      {active && (
        <div className={style.variants}>
          {prop.map((item) => (
            <img
              src={`https://change.pro${item.icon.path}`}
              className={style.img}
              id={item.id}
              onMouseEnter={(e) => ShowTip(item)}
              onMouseLeave={hideTips}
            />
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
