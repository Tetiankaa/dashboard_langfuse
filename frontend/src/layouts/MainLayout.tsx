import { Outlet, useLocation } from "react-router-dom";

import { Header } from "../components/header/Header.tsx";

const MainLayout = () => {

    const location = useLocation();

    return (
        <div>
            { location && !location?.pathname.includes('login') && <Header />}
            <Outlet />
        </div>
    );
};

export { MainLayout };
