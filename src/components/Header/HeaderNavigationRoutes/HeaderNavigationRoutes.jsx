import { Link } from "react-router-dom";
import style from './HeaderRoutes.module.scss'
export default function HeaderNavigationRoutes() {
  return (
    <nav className={style.Buttons__box}>
      <ul className={style.Buttons}>
        <Link className={style.Buttons__btn} to="/changePro">
          Мониторинг
        </Link>
        <Link className={style.Buttons__btn} to="/exchangers">
          Обменники
        </Link>
        <Link className={style.Buttons__btn} to="/forPartners">
          Партнерам
        </Link>
        <Link className={style.Buttons__btn} to="/help">
          Помощь
        </Link>
        <Link className={style.Buttons__btn} to="/articles">
          Статьи
        </Link>
      </ul>
    </nav>
  );
}
