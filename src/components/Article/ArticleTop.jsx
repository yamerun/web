import React, { useEffect, useState } from "react";
import style from "./Article.module.scss";
import axios from "axios";
export const ArticleTop = () => {
	const [header, setHeader] = useState("");
	const [text, setText] = useState("");
	useEffect(() => {
		axios
			.get(`https://change.pro/api/content/get`)
			.then(function (response) {
				setText(response.data.data.head.description);
				setHeader(response.data.data.head.title_description);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	function createMarkup(text) {
		return { __html: `${text}` };
	}

	return <>
		{header || text && (
			<div className={style.Article}>
				<h1 className={style.Article__header}>{header}</h1>
				<div
					style={{ color: 'white' }}
					className={style.Article__text}
					dangerouslySetInnerHTML={createMarkup(text)}
				></div>
			</div>
		)}
	</>
};
