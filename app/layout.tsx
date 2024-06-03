'use client'
import React from "react";
import ThemeRegistry from "@/app/components/ThemeRegistry";
import {DashboardContextProvider} from "@/app/context/DashboardContext";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head title="Dashboard"/>
            <body>
                <ThemeRegistry>
                    <DashboardContextProvider>
                    {children}
                    </DashboardContextProvider>
                </ThemeRegistry>
            </body>
        </html>
    );
}
