import React, { useEffect, useState } from "react";
import style from "./Articles.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { Link } from "react-router-dom";

import { SearchMenu } from "../../components/SearchMenu/SearchMenu";
import { Article } from "../../components/Article/Article";

export const ArticleLoader = async ({ params }) => {
	const articleid = params.id;
	const response = await fetch(
		`https://change.pro/api/articles/get_detail?id=${articleid}`
	);
	const article = await response.json();

	return { article, articleid };
};

export const Articles = () => {
	const navigate = useNavigate();
	const [articles, setArcicles] = useState([]);

	const goToArticle = ({ id }) => {
		navigate(`/article/${id}`);
	};

	const { isExchangerRole } = useSelector((state) => ({
		isExchangerRole: state.AccountSlice.isExchangerRole,
	}));

	useEffect(() => {
		axios
			.get(`https://change.pro/api/articles/get?limit=2&offset=0`)
			.then(function (response) {
				setArcicles(response.data.data);
			});
	}, []);

	function createMarkup({ preview }) {
		preview = preview.replace(/(<([^>]+)>)/gi, '');
		return { __html: `${preview}` };
	}

	function getDatePublic({ created_at }) {
		const foramatteDate = new Date(created_at.date + 'T' + created_at.time);
		return foramatteDate.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' }).replace(' г.', '');
	}

	return (
		<div className={'section-wrapper'}>
			<div className={'container-full'}>
				<div className="row">
					<SearchMenu />
					<main className='col-md-4 col-lg-9'>
						<div className={style.Articles}>
							<section className={style.Articles__header + ' col-12'}></section>
							<div className={style.Articles__container__articles + ' row'}>
								{articles.map((item) => (
									<div className="col-lg-4">
										<Link to={`/article/${item.id}`} className="block">
											<article
												className={style.Articles__container__article}
												onClick={(e) => goToArticle(item)}
											>
												<div className={style.Articles__container__article__img}>
													<div className="media-ratio">
														<img
															alt={item.title}
															src={`https://change.pro/${item.preview_picture.path}`}
														/>
													</div>
												</div>

												<div className={style.Articles__container__article__info}>
													<time className={style.Articles__container__article__date} datetime={item.created_at.date}>{getDatePublic(item)}</time>
													<h2 className={style.Articles__container__article__tittle}>{item.title}</h2>
													<div
														className={style.Articles__container__article__text}
														dangerouslySetInnerHTML={createMarkup(item)}
													></div>
												</div>
											</article>
										</Link>
									</div>
								))}
							</div>
							<Article />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};
