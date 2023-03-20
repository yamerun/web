import React, { useEffect } from "react";
import axios from "axios";
import style from "./Comments.module.scss";
export const Comments = () => {
  useEffect(() => {
    axios.get(
      `http://146.59.87.222/api/reviews/get?sort=desc&orderBy=id5&limit=5`,
      then({
        function(response) {
          console.log(response);
        },
      })
    );
  });

  return (
    <div>
      <div>comm</div>
    </div>
  );
};
