import React, { useEffect, useState } from "react";
import style from "./Article.module.scss";
import axios from "axios";
export const Article = () => {
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/content/get`)
      .then(function (response) {
        console.log(response.data.data.main_page.title_description);
        setText(response.data.data.main_page.description);
        setHeader(response.data.data.main_page.title_description);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className={style.Article}>
      <div className={style.Article__header}>
        <h1> {header}</h1>
      </div>
      <article className={style.Article__text}>{text}</article>
    </div>
  );
};

/*        Несмотря на все более и более массовое принятие криптовалют по всему
        миру, обойтись без фиатных денег пока невозможно. Держателям
        криптовалюты все чаще необходимо регулярно продавать и покупать Bitсoin
        и другие монеты. Но как это сделать, избежав мошенников и не потеряв
        деньги из-за невыгодного курса?*/
