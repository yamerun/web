import React, { useState } from "react";
import "./styles.css";
import { setScammerSearchIndex } from "../../store/ExChangerSlice/ExchangerSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Checkbox = ({ label, checked, onClick }) => {
  return (
    <label className="checkbox-container">
      <span>{label} </span>
      <input type="checkbox" onClick={onClick} checked={checked} />
      <span className="checkmark"></span>
    </label>
  );
};

export const CheckboxGroup = ({ checkboxes }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();
  const handleCheckboxClick = (index) => {
    if (activeIndex === index) {
      return;
    }
    const updatedCheckboxes = checkboxes.map((checkbox, i) => {
      if (i === activeIndex) {
        return { ...checkbox, checked: false };
      }
      if (i === index) {
        return { ...checkbox, checked: true };
      }
      return checkbox;
    });
    setActiveIndex(index);
    setCheckboxes(updatedCheckboxes);
  };

  const [initialCheckboxes, setCheckboxes] = useState(
    checkboxes.map((checkbox) => ({
      ...checkbox,
      checked: false,
    }))
  );

  useEffect(() => {
    dispatch(setScammerSearchIndex(activeIndex));
  }, [activeIndex]);

  return (
    <div className="checkbox-group">
      {initialCheckboxes.map((checkbox, index) => (
        <Checkbox
          key={index}
          label={checkbox.label}
          checked={checkbox.checked}
          onClick={() => handleCheckboxClick(index)}
        />
      ))}
    </div>
  );
};
