import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {IItem, DashboardContextProps} from '@/app/types/types';

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

const DashboardContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<IItem | null>(null);
    const [widgets, setWidgets] = useState<IItem | null>(null);
    const [catalog, setCatalog] = useState<IItem | null>(null);
    const pathname = usePathname();
    const [section, setSection] = useState<string | null>(null);

    useEffect(() => {
        setSection(pathname.split('/').pop() || null);
    }, [pathname]);

    const fetchData = useCallback(async (section: string, setItems: (items: IItem | null) => void) => {
        try {
            const response = await fetch(`/api/data?section=${section}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setItems(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const fetchProjects = useCallback(() => fetchData('projects', setProjects), [fetchData]);
    const fetchWidgets = useCallback(() => fetchData('widgets', setWidgets), [fetchData]);
    const fetchCatalog = useCallback(() => fetchData('catalog', setCatalog), [fetchData]);
    const sections = {
        projects,
        widgets,
        catalog,
    };

    const value = {
        projects,
        widgets,
        catalog,
        section,
        sections,
        fetchProjects,
        fetchWidgets,
        fetchCatalog,
    };

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

const useDashboardContext = (): DashboardContextProps => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboardContext must be used within a DashboardContextProvider');
    }
    return context;
};

export { DashboardContextProvider, useDashboardContext };
