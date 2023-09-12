import React from "react";
import img from "../../assets/imgs/emptyRatesCat.png";
import style from "./EmptyCourses.module.scss";
import { useSelector } from "react-redux";
export default function EmptyCourse() {
	const { currentFrom, currentTo, isTwice } = useSelector((state) => ({
		currentFrom: state.itemsSlice.currentFrom,
		currentTo: state.itemsSlice.currentTo,
	}));
	const [alert, setAlert] = React.useState("");
	React.useEffect(() => {
		if (currentFrom === undefined || currentTo === undefined) {
			setAlert("Одна из валют не выбрана");
		} else setAlert("По данным валютам курсов пока нет");
	}, [currentFrom, currentTo]);
	return (
		<tbody>
			<tr>
				<td colSpan={7}>
					<div className={style.EmptyRates}>
						<h4 className={style.EmptyRates__text}>{alert}</h4>
						<img src={img} className={style.EmptyRates__img} />
					</div>
				</td>
			</tr>
		</tbody>
	);
}
