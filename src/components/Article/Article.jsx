import React from "react";
import style from './Article.module.scss'
export const Article = () => {
  return (
    <div className={style.Article}>
      <div className={style.Article__header}>
        <h1> Покупка и продажа криптовалюты по выгодной цене</h1>
      </div>
      <article className={style.Article__text}>
        Несмотря на все более и более массовое принятие криптовалют по всему
        миру, обойтись без фиатных денег пока невозможно. Держателям
        криптовалюты все чаще необходимо регулярно продавать и покупать Bitсoin
        и другие монеты. Но как это сделать, избежав мошенников и не потеряв
        деньги из-за невыгодного курса?
      </article>
    </div>
  );
};
