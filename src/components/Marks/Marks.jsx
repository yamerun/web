import React, { useEffect, useState } from "react";
import "./Marks.scss";
import { useDispatch } from "react-redux";
import { Overlay } from "react-overlays";

export const Marks = (prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [resultArr, setresultArr] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [currentItem, setCurrentItem] = useState();

  const toggleTooltipOn = () => {
    setIsOpen(true);
  };
  const toggleTooltipOf = () => {
    setIsOpen(false);
  };

  console.log(prop.prop.icon.path);

  return (
    <div>
      <button
        type="button"
        id="tooltipTarget"
        onMouseEnter={toggleTooltipOn}
        onMouseLeave={toggleTooltipOf}
      >
        <img src={`https://change.pro${prop.prop.icon.path}`} />{" "}
      </button>
      <Overlay
        placement="top"
        show={isOpen}
        target={() => document.getElementById("tooltipTarget")}
      >
        {({ placement, arrowProps, props }) => (
          <div
            {...props}
            style={{ ...props.style, zIndex: 1000 }}
            placement={placement}
          >
            <TooltipBody>{prop.prop.description}</TooltipBody>
            <TooltipArrow {...arrowProps} />
          </div>
        )}
      </Overlay>
    </div>
  );
};

const TooltipBody = ({ children }) => <div className="text">{children}</div>;

const TooltipArrow = ({ ref }) => <div ref={ref} className="arrow" />;
