import React from "react";
import { Link } from "react-router-dom";
import style from "./NotFound.module.scss";
import img from "../../assets/imgs/404.png";

export const NotFound = () => {
	return (
		<div className={'section-wrapper'}>
			<div className={'container-full'}>
				<div className="row">
					<div className={'col-md-2'}></div>
					<div className={'col-md-8'}>
						<div className="block">
							<div className={style.NotFound}>
								<div className={style.NotFound__headeing}>Ой, что-то пошло не так:</div>
								<picture className={style.NotFound__image}>
									{/*
										<source
											srcset="small-car-image.jpg 400w, medium-car-image.jpg 800w, large-car-image.jpg 1200w"
											sizes="(min-width: 1280px) 1200px, (min-width: 768px) 400px, 100vw" />
										*/}
									<img src={img} className="" alt="Error 404" />
								</picture>
								<Link className={style.NotFound__gotohome} to="/">На главную</Link>
							</div>
						</div>
					</div>
					<div className={'col-md-2'}></div>
				</div>
			</div >
		</div >
	);
};