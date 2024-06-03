"use client"
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('access_token')) {
            router.push('/login');
        }
    }, [router]);
};
