import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {createRoot} from "react-dom/client";

import "./styles/index.scss";

import {App} from "./app/App";

const queryClient = new QueryClient()


createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <App/>
    </QueryClientProvider>
);
