import React, { useEffect, useState } from "react";
import style from "./Partners.module.scss";
import axios from "axios";
export default function Partners() {
	const [partners, setPartners] = useState("");

	useEffect(() => {
		axios
			.get(`https://change.pro/api/partners/get`)
			.then(function (response) {
				setPartners(response.data.data);
			})
			.catch(function (error) { });
	}, []);


	return (
		<div className="row">
			<div className="col-12">
				<div className="block txt-center">
					<p className="spacer-double"></p>
					<h2>Рекомендации партнёров от Change.Pro</h2>
				</div>
			</div>
			{partners.length !== 0 &&
				partners.map((item) => (
					<div className="col-lg-3 col-md-4 col-6">
						<div className="block">
							<div className={style.Partners__item}>
								<h4 className={style.Partners__item__heading}>{item.name}</h4>
								<div className={style.Partners__item__img}>
									<div className="media-ratio">
										<img src={`https://change.pro/${item.logo.path}`} alt={item.name} />
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

