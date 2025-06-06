import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layouts/MainLayout.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { DashboardPage } from "./pages/DashboardPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";


const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <Navigate to={'login'} /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'dashboard', element: <DashboardPage /> },
        ]
    }
])

export { router }
