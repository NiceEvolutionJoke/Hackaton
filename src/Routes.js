/* import main from './pages/main'; */
import Article from './pages/article';
import Login from './pages/Login/Login';
import { Main } from './pages/main';
import { RootConfig } from './utils/consts';
import SignUp from './pages/SingUp/SingUp';
import { Сategories } from './pages/Сategories';
import { Articles } from './pages/articles';

export const authRoutes = [
    // {
    //     path: RootConfig.ADMIN,
    //     Component: Admin
    // },
    // {
    //     path: RootConfig.BASKET,
    //     Component: Basket
    // },
];
export const publicRoutes = [
    {
        path: RootConfig.MAIN,
        Component: Main,
    },
    {
        path: RootConfig.ARTICLE + '/:slug',
        Component: Article,
    },
    {
        path: RootConfig.SIGNUP,
        Component: SignUp,
    },
    {
        path: RootConfig.LOGIN,
        Component: Login,
    },
    {
        path: RootConfig.CATEGORIES,
        Component: Сategories,
    },
    {
        path: RootConfig.ARTICLES,
        Component: Articles,
    },
];
