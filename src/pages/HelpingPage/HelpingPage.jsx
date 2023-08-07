import React, { useEffect, useState } from "react";
import style from "./HelpingPage.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";

import { SearchMenu } from "../../components/SearchMenu/SearchMenu";

export const HelpingPage = () => {
	const [data, setData] = useState("");
	const { isExchangerRole } = useSelector((state) => ({
		isExchangerRole: state.AccountSlice.isExchangerRole,
	}));
	useEffect(() => {
		axios
			.get(`https://change.pro/api/content/page_helping`)
			.then(function (response) {
				setData(response.data.data.description);
			});
	}, []);

	function createMarkup(content) {
		return { __html: `${content}` };
	}
	console.log(data)

	return (
		<div className={'section-wrapper'}>
			<div className={'container-full'}>
				<div className="row">
					<SearchMenu />
					<main className={style.HelpingPage + 'col-md-4 col-lg-9'}>
						<div className="block">
							<div className={style.HelpingPage__textbox}>
								<p className={style.HelpingPage__textbox__text} dangerouslySetInnerHTML={createMarkup(data)}></p>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};
