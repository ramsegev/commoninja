import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDashboardContext } from "@/app/context/DashboardContext";

const useFetchData = () => {
    const { fetchProjects, fetchWidgets, fetchCatalog } = useDashboardContext();

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            fetchWidgets();
            fetchProjects();
            fetchCatalog();
        }
    }, [fetchProjects, fetchWidgets, fetchCatalog]);
};

export default useFetchData;
