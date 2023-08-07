import React from "react";
import { InputRegistration } from "../../components/inputRegistration/inputRegistration";
export const RegisterPage = () => {
	return (
		<div className={'section-wrapper d-flex f-center'}>
			<div className={'container-full'}>
				<div className="row">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="block">
							<InputRegistration />
						</div>
					</div>
					<div className="col-sm-4"></div>
				</div>
			</div>
		</div>
	);
};
