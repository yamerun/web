import axios from "axios";
import style from "./Account.module.scss";
import { useLoaderData } from "react-router-dom";

import React from "react";
export default function AccountSettings() {
	const { item } = useLoaderData();
	const SettingsParams = React.lazy(() =>
		import("../../components/SettingsParams/SettingsParams")
	);
	const ChangePassword = React.lazy(() => import('../../components/AccountChangePassword/AccountChangePassword'));
	const AccountDelete = React.lazy(() => import('../../components/AccountDelete/AccountDelete'));

	return (
		<div className="row">
			<div className="col-sm-6">
				<div className="block">
					<React.Suspense fallback={<h6>...loading</h6>}>
						<SettingsParams
							item={item}
						/>
					</React.Suspense>
				</div>
			</div>
			<div className="col-sm-6">
				<div className="block">
					<React.Suspense fallback={<h6>...loading</h6>}>
						<ChangePassword
							item={item}
						/>
					</React.Suspense>
				</div>
				<div className="block">
					<React.Suspense fallback={<h6>...loading</h6>}>
						<AccountDelete
							item={item}
						/>
					</React.Suspense>
				</div>
			</div>
		</div>
	);
}
