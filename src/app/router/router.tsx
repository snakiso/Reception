import { useEffect } from "react";
import {
    RouterProvider,
    createBrowserRouter,
    useNavigate,
} from "react-router-dom";

import { Layout } from "../../components/layout/Layout";
import { AlphabetList } from "../../pages/alphabetList/AlphabetList";
import { FullList } from "../../pages/fullList/FullList";
import { TableList } from "../../pages/tableList/TableList";

const RootRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/reception/alphabet");
    }, [navigate]);

    return null;
};

export const router = createBrowserRouter([
    {
        children: [
            {
                element: <FullList />,
                path: "/reception/list",
            },
            {
                element: <AlphabetList />,
                path: "/reception/alphabet",
            },
            {
                element: <TableList />,
                path: "/reception/table",
            },
            {
                element: <RootRedirect />,
                path: "/reception",
            },
        ],
        element: <Layout />,
        path: "/reception",
    },
]);
export const Router = () => {
    return <RouterProvider router={router} />;
};
