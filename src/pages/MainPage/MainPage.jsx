import React, { useEffect } from "react";
import style from "./MainPage.module.scss";
import { SearchMenu } from "../../components/SearchMenu/SearchMenu";
//import { Carousel } from "../../components/Advertisement/Carousel";
import { Fillters } from "../../components/Fillters/Fillters";
import { Article } from "../../components/Article/Article";
import { ArticleTop } from "../../components/Article/ArticleTop";

export const MainPage = () => {
	return (
		<div className={'section-wrapper ' + style.MainPage}>
			<div className={'container-full ' + style.MainPage__containerMenu}>
				<div className="row">
					<SearchMenu />
					<main className={'col-md-8 col-lg-9'}>
						<div className="block">
							<div className={style.MainPage__rightMenu}>
								<ArticleTop />
								<Fillters />
								<Article />
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};
