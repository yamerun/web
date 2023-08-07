import React from "react";

const ExchangerRegisterForm = React.lazy(() =>
	import("../../components/ExchangerRegisterForm/ExchangerRegisterForm")
);

export const ExchangerRegisterPage = () => {
	return (
		<div className={'section-wrapper d-flex f-center'}>
			<div className={'container-full'}>
				<div className="row">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="block">
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
								<ExchangerRegisterForm />
							</React.Suspense>
						</div>
					</div>
					<div className="col-sm-4"></div>
				</div>
			</div>
		</div>
	);
};
