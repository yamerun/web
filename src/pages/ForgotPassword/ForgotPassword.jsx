import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";

export const ForgotPasswordLoader = async ({ params }) => {
	const step = params.step;
	return { step };
};

export const ForgotPassword = () => {
	const { step } = useLoaderData();
	let StepSection = '';

	switch (step) {
		case 'newpassword':
			StepSection = React.lazy(() => import('../../components/ForgotPassword/NewPassword'));
			break;
		case 'code':
			StepSection = React.lazy(() => import('../../components/ForgotPassword/Code'));
			break;
		default:
			StepSection = React.lazy(() => import('../../components/ForgotPassword/Reset'));
			break;
	}

	return (
		<div className={'section-wrapper d-flex f-center'}>
			<div className={'container-full'}>
				<div className="row">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="block">
							<React.Suspense fallback={<h6>...loading</h6>}>
								<StepSection />
							</React.Suspense>
						</div>
					</div>
					<div className="col-sm-4"></div>
				</div>
			</div>
		</div>
	);
};