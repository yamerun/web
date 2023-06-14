import React, { useEffect, useState } from "react";
import style from "./HelpingPage.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";

export const HelpingPage = () => {
  const [data, setData] = useState("");
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));
  useEffect(() => {
    axios
      .get(`https://change.pro/api/content/page_helping`)
      .then(function (response) {
        setData(response.data.data.description);
      });
  }, []);

  function createMarkup(content) {
    return { __html: `${content}` };
  }
  console.log(data)

  return (
    <div className={style.HelpingPage}>
      <div className={style.HelpingPage__textbox}>
        <p className={style.HelpingPage__textbox__text} dangerouslySetInnerHTML={createMarkup(data)}></p>
      </div>

    </div>
  );
};
