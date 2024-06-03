import React from 'react';
import DashboardLayout from "@/app/components/DashboardLayout";

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout >
            {children}
        </DashboardLayout>
    );
}

