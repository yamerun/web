import React, { useEffect, useState } from "react";
import style from "./Article.module.scss";
import axios from "axios";
export const Article = () => {
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    axios
      .get(`https://change.pro/api/content/get`)
      .then(function (response) {
        console.log(response.data.data.main_page.title_description);
        setText(response.data.data.main_page.description);
        setHeader(response.data.data.main_page.title_description);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function createMarkup(text) {
    return { __html: `${text}` };
  }

  return (
    <div className={style.Article}>
      <h1 className={style.Article__header}> {header}</h1>
      <div
      style={{color:'white'}}
      className={style.Article__text}
      dangerouslySetInnerHTML={createMarkup(text)}
      ></div>
    </div>
  );
};
