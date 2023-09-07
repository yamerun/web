import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { MainPageAttrs } from "./pages/MainPage/MainPageAttrs";
import { MainPageLoader } from "./pages/MainPage/MainPageAttrs";
import "./assets/styles/Common.scss";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ItemPage } from "./pages/itemPage/itemPage";
import { exchangeLoader } from "./pages/itemPage/itemPage";
import { PersonalAccount } from "./pages/PersonalAccount/PersonalAccount";
import { PersonalAccountLoader, AccountPageLoader } from "./pages/PersonalAccount/PersonalAccountLoader";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/Register";
import { AccountLoader } from "./pages/PersonalAccount/PersonalAccount";
import { AllEchangers } from "./pages/AllExchangersPage/AllEchangers";
import { exchangersLoader } from "./pages/AllExchangersPage/AllEchangers";
import { Articles } from "./pages/Articles/Article";
import { ForPartners } from "./pages/forPartners/forPartners";
import { Articlepage } from "./pages/ArticlePage/ArticlePage";
import { ScammersBase } from "./pages/ScammersBase/ScammersBase";
import { InfoPage } from "./pages/InfoPage/InfoPage";
import { infoloader } from "./pages/InfoPage/InfoPage";
import { ExchangerReviews } from "./pages/ExchangerReviews/ExchangerReviews";
import { ExchangerCourses } from "./pages/ExchangerCourses/ExchangerCourses";
import { ExchangerMarks } from "./pages/Marks/Marks";
import { ExchangerNotifications } from "./pages/ExchangerNotifications/ExchangerNotifications";
import { HelpingPage } from "./pages/HelpingPage/HelpingPage";
import { ArticleLoader } from "./pages/Articles/Article";
import { reviewloader } from "./pages/ExchangerReviews/ExchangerReviews";
// import { AccountReviews } from "./pages/AccountReviews/AccountReviews";
// import { AccountReviewloader } from "./pages/AccountReviews/AccountReviews";
import { CoursesLoader } from "./pages/ExchangerCourses/ExchangerCourses";
import { ExchangerRegisterPage } from "./pages/ExchangerRegister/ExchangerRegister";
import MainLayout from "./Layouts/MainLayout";
import { TimerPage } from "./pages/TimerPage";
// import AccountSettings from "./pages/AccountSettings/AccountSettings";
// import { FavoriteExchangers } from "./pages/FavoriteExchangers/FavoriteExchangers";
// import { FavoriteExchangersLoader } from "./pages/FavoriteExchangers/FavoriteExchangers";
// import SubscribeDetail from "./pages/SubscribeDetail/SubscribeDetail";
import { ForgotPassword, ForgotPasswordLoader } from "./pages/ForgotPassword/ForgotPassword";
import { NotFound } from "./pages/NotFound/NotFound";
const router = createBrowserRouter([
	{
		element: <TimerPage />,
		path: "/",
	},
	{
		element: <MainLayout />,
		children: [
			{
				path: "/changePro",
				element: <MainPage />,
			},
			{
				path: "/changePro/:exchange",
				element: <MainPageAttrs />,
				loader: MainPageLoader,
			},
			{
				path: "/exchanger/:id",
				element: <ItemPage />,
				loader: exchangeLoader,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/reset-password/:step",
				element: <ForgotPassword />,
				loader: ForgotPasswordLoader,
			},
			{
				path: "/register",
				element: <RegisterPage />,
			},
			{
				path: "/account",
				element: <PersonalAccount />,
				loader: AccountLoader,
			},
			{
				path: "/account/:navset",
				element: <PersonalAccountLoader />,
				loader: AccountPageLoader,
			},
			/*
			{
				path: "/account/reviews",
				element: <AccountReviews />,
				loader: AccountReviewloader,
			},
			{
				path: "/account/favoriteexchangers",
				element: <FavoriteExchangers />,
				loader: FavoriteExchangersLoader,
			},
			{
				path: "/account/accountSettings",
				element: <AccountSettings />,
				loader: AccountLoader,
			},
			{
				path: '/account/subscribe/detail',
				element: <SubscribeDetail />
			}
			*/
			{
				path: "/exchangers",
				element: <AllEchangers />,
				loader: exchangersLoader,
			},
			{
				path: "/articles",
				element: <Articles />,
			},
			{
				path: "/help",
				element: <HelpingPage />,
			},
			{
				path: "/partners",
				element: <ForPartners />,
			},
			{
				path: "/article/:id",
				element: <Articlepage />,
				loader: ArticleLoader,
			},
			{
				path: "/exchanger/scammers",
				element: <ScammersBase />,
			},
			{
				path: "/exchanger/info",
				element: <InfoPage />,
				loader: infoloader,
			},
			{
				path: "/exchanger/reviews",
				element: <ExchangerReviews />,
				loader: reviewloader,
			},
			{
				path: "/exchanger/courses",
				element: <ExchangerCourses />,
				loader: CoursesLoader,
			},
			{
				path: "/exchanger/marks",
				element: <ExchangerMarks />,
			},
			{
				path: "/exchanger/notifications",
				element: <ExchangerNotifications />,
			},
			{
				path: "/exchanger/register",
				element: <ExchangerRegisterPage />,
			},
			{
				path: "*",
				element: <NotFound />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
