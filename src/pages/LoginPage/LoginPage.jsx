import React, { useState } from "react";
import style from "./LoginPage.module.scss";
import { Link } from "react-router-dom";
import { Input } from "../../components/InputLogin/Input";
export const LoginPage = () => {
	return (
		<div className={'section-wrapper d-flex f-center'}>
			<div className={'container-full'}>
				<div className="row">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="block">
							<Input />
						</div>
					</div>
					<div className="col-sm-4"></div>
				</div>
			</div>
		</div>
	);
};
