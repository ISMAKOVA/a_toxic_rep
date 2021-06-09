import {
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MODERATION_ROUTE,
    REGISTRATION_ROUTE,
    STATISTICS_ROUTE,
    USER_ROUTE
} from "./utils/consts";
import MainPage from "./pages/MainPage";
import ModerationPage from "./pages/ModerationPage";
import StatisticsPage from "./pages/StatisticsPage";
import UserPage from "./pages/UserPage";
import Auth from "./pages/Auth";

export const authRoutes = [

    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: MODERATION_ROUTE,
        Component: ModerationPage
    },
    {
        path: STATISTICS_ROUTE,
        Component: StatisticsPage
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]
