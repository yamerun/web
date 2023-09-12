import React, { useState, useEffect } from "react";
import style from "./EmptyPlaceholder.module.scss";

export const EmptyPlaceholder = ({ type = '' }) => {
	const [content, setContent] = useState('');

	useEffect(() => {
		switch (type) {
			case 'favorites':
				setContent('<h4>Избранных нет</h4><p>Пока не добавляли обменники в Избранное.</p>');
				break;
			case 'reviews-account':
				setContent('<h4>Отзывов нет</h4><p>Вы пока не оставляли отзывов.</p>');
				break;
			case 'reviews':
				setContent('<h4>Отзывов нет</h4><p>Пока никто не оставлял отзывов.</p>');
				break;
			default:
				setContent('<h4>Ничего не найдено.</h4><p>Здесь пока ничего нет.</p>');
				break;
		}
	});

	return (
		<div className={style.Popup}>
			<div className={style.Popup__wrapper}>
				<div className={style.Popup__body}>
					<div className={style.Popup__content} dangerouslySetInnerHTML={{ __html: content }}></div>
				</div>
			</div>
		</div>
	);
}