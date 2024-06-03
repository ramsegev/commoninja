interface DashboardContextProps {
    projects: IItem | null;
    widgets: IItem | null;
    catalog: IItem | null;
    section: string | null;
    sections: { [key: string]: IItem | null };
    fetchProjects: () => Promise<void>;
    fetchWidgets: () => Promise<void>;
    fetchCatalog: () => Promise<void>;
}
interface IWidget {
    id: string;
    name: string;
    description: string;
    type: string;  // Widget type (e.g., "comparison_table")
    previewImage?: string;  // Optional preview image URL
    status: string;  // Widget status (e.g., "draft", "published")
    modelVersion: number;
    created: string;  // ISO 8601 formatted date string
    updated: string;  // ISO 8601 formatted date string
}
interface IProject {
    projectId: string;
    userId: string;
    name: string;
    slug: string;
    domains: string[]; // Array of strings for project domains
    description: string;
    thumbnail?: string; // Optional thumbnail URL
    created: string; // ISO 8601 formatted date string
    updated: string; // ISO 8601 formatted date string
}
interface ICatalog {
    id: string;
    name: string;
    slug: string;
    buttonText: string;
    teaser: string;
    logo?: string; // Optional logo URL
    promotionImage?: string; // Optional promotion image URL
    categories: string[]; // Array of string categories
}
type IDoc = IWidget & IProject & ICatalog;
interface IItem {
    total: number,
    limit: number,
    offset: number,
    page: number,
    pages: number,
    docs:[IDoc]
}
export type {
    DashboardContextProps,
    IDoc,
    IItem,
};