import React, { useState } from "react";
import "./styles.css";

export const Checkbox = ({ label, checked, onClick }) => {
  return (
    <label className="checkbox-container">
     <span>{label} </span>
      <input type="checkbox" onClick={onClick} checked={checked} />
      <span className="checkmark"></span>
    </label>
  );
};

