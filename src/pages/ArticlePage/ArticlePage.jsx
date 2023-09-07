import React from "react";
import style from "./Article.module.scss";

import { SearchMenu } from "../../components/SearchMenu/SearchMenu";

import { Link, useLoaderData } from "react-router-dom";
export const Articlepage = () => {
	const { article } = useLoaderData();
	function createMarkup(content) {
		content = content.replace(/style="[\s\S]*?"/gi, "");
		return { __html: `${content}` };
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
						<article className={style.Article + ' block'}>
							<header className={style.Article__header}>
								<time className={style.Article__date}>{getDatePublic(article.data)}</time>
								<h1 className={style.Article__title}>{article.data.title}</h1>
								<Link to='/articles' className={style.Article__header__close} >✕</Link>
							</header>

							<section className={style.Article__cover}>
								<div className="media-ratio">
									<img alt={article.data.title} src={`https://change.pro/${article.data.preview_picture.path}`} />
								</div>
							</section>

							<section
								style={{ color: 'white' }}
								className={style.Article__content}
								dangerouslySetInnerHTML={createMarkup(article.data.content)}
							></section>

							<footer className={style.Article__footer}>
								<h1 className={style.Article__views}>
									Просмотрено: {article.data.count_views} раз
								</h1>
							</footer>
						</article>
					</main>
				</div>
			</div>
		</div>
	);
};
