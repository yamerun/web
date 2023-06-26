import { Link } from "react-router-dom";
import style from "./HeaderRoutes.module.scss";
export default function HeaderNavigationRoutes() {
  const setActiveRoute = (e) => {
    e.target.classList.add(`${style.active}`);
    const buttons = document.querySelectorAll(`.${style.Buttons__btn}`);
    for (i of buttons) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
  };
  return (
    <ul className={style.Buttons}>
      <Link
        className={style.Buttons__btn}
        to="/changePro"
        onClick={(e) => setActiveRoute(e)}
      >
        Мониторинг
      </Link>
      <Link
        className={style.Buttons__btn}
        to="/exchangers"
        onClick={(e) => setActiveRoute(e)}
      >
        Обменники
      </Link>
      <Link
        className={style.Buttons__btn}
        to="/forPartners"
        onClick={(e) => setActiveRoute(e)}
      >
        Партнерам
      </Link>
      <Link
        className={style.Buttons__btn}
        to="/help"
        onClick={(e) => setActiveRoute(e)}
      >
        Помощь
      </Link>
      <Link
        className={style.Buttons__btn}
        to="/articles"
        onClick={(e) => setActiveRoute(e)}
      >
        Статьи
      </Link>
    </ul>
  );
}
