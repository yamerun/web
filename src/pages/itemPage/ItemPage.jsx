import React, { useEffect, useState, useRef } from "react";
import style from "./ItemPage.module.scss";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { SearchMenu } from "../../components/SearchMenu/SearchMenu";
import { Comments } from "../../components/Comments/Comments";
import { ItemPageExchangerHeader } from "../../components/ItemPageExchangerHeader/ExchangerHeader";
import { ItemPageExchangerDescription } from "../../components/ItemPageExchangerDecsription/ExchangerDescription";
import { ItemPageInfoBlock } from "../../components/ItemPageInfoBlock/ItemPageInfoBlock";

const AddComment = React.lazy(() =>
	import("../../components/AddComment/AddComment")
);

export const exchangeLoader = async ({ params }) => {
	const id = params.id;
	const res = await fetch(
		`https://change.pro/api/exchangers/get?exchanger_id=${id}`
	);
	const item = await res.json();
	return { id, item };
};

export const ItemPage = () => {
	const { item } = useLoaderData();
	const [review, setReview] = useState();
	const [screenSize, getDimension] = React.useState({
		dynamicWidth: window.innerWidth,
		dynamicHeight: window.innerHeight,
	});
	const [isOpen, setIsOpen] = useState(false);
	const [hideBlocks, setHideBlocks] = useState(false);

	useEffect(() => {
		axios
			.get(
				`https://change.pro/api/reviews/get?sort=desc&orderBy=id&limit=5&exchanger_id=${item.data.id}`
			)
			.then(function (response) {
				setReview(response.data.data);
			})

			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const ref = useRef(null);
	const HideReviews = () => {
		setIsOpen(false);
	};
	const OpenIframe = () => {
		setHideBlocks(!hideBlocks);
	};

	useEffect(() => {
		if (IframeBlock.current) {
			if (hideBlocks === true) {
				IframeBlock.current.classList.add(`${style.open}`);
				iframebtn.current.classList.add(`${style.btnActive}`);
			}
			if (hideBlocks === false) {
				IframeBlock.current.classList.remove(`${style.open}`);
				iframebtn.current.classList.remove(`${style.btnActive}`);
			}
		}
	}, [hideBlocks]);

	const IframeBlock = useRef(null);
	const iframebtn = useRef(null);
	const main = useRef(null);

	const ShowReviews = () => {
		setIsOpen(true);
		main.current.classList.add(`${style.pupActive}`);
	};

	useEffect(() => {
		setIsOpen(true);
		main.current.classList.add(`${style.pupActive}`);
	}, [isOpen]);

	const setDimension = () => {
		getDimension({
			dynamicWidth: window.innerWidth,
			dynamicHeight: window.innerHeight,
		});
	};

	useEffect(() => {
		window.addEventListener("resize", setDimension);
		return () => {
			window.removeEventListener("resize", setDimension);
		};
	}, [screenSize]);

	return (
		<div className={'section-wrapper ' + style.itemPage} ref={main}>
			<div className={'container-full'}>
				<div className="row">
					<SearchMenu />
					<main className={'col-md-8 col-lg-9'} ref={ref}>
						<div className="row">
							<div className="col-12">
								<ItemPageExchangerHeader item={item} />
							</div>
						</div>
						<div className="row">
							{Object.keys(item.data.iframe.src).length !== 0 && (
								<div className="col-12">
									<div
										className="block"
										ref={IframeBlock}
									>
										<button
											className={style.itemPage__container__items__item__iframebtn}
											onClick={OpenIframe}
											ref={iframebtn}
										/>
										<iframe
											src={item.data.iframe.src}
											className={style.itemPage__container__Iframe}
										/>
									</div>
								</div>
							)}

							<div className="col-lg-5">
								{hideBlocks !== true && (
									<ItemPageInfoBlock item={item} ShowReviews={ShowReviews} />
								)}
							</div>

							<div className="col-lg-7">
								{hideBlocks !== true && <ItemPageExchangerDescription item={item} />}
							</div>
						</div>
						<div className={style.itemPage__comments + ' row'}>
							<div className="col-12">
								<div className="block">
									<h2 className={style.itemPage__reviews__header}>
										Отзывы {item.data.name}
									</h2>
								</div>
								{review != null ? (
									review.map((item) => (
										<Comments
											props={item}
											key={item.id}
											review={setReview}
											w={screenSize.dynamicWidth < 1090 ? "70%" : "30%"}
										/>
									))
								) : (
									<div></div>
								)}
							</div>
						</div>
						<div className="row">
							{isOpen && (
								<React.Suspense
									fallback={
										<h6
											style={{
												color: "white",
												textAlign: "center",
												fontSize: "15px",
											}}
										>
											...Loading
										</h6>
									}
								>
									<AddComment HideReviews={HideReviews} id={item.data.id} name={item.data.name} />
								</React.Suspense>
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};
