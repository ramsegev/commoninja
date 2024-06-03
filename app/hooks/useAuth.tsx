import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface UseAuthReturn {
    login: (username: string, password: string) => Promise<void>;
    error: string | null;
    setError: (error: string | null) => void;
}

const useAuth = (): UseAuthReturn => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const { token } = data;

            // Save token to cookie
            Cookies.set('access_token', token, { expires: 7, secure: true, sameSite: 'strict' });
            // Redirect to dashboard
            router.push('/dashboard');
        } catch (error) {
            setError('Error during login: ' + (error as Error).message);
        }
    };

    return { login, error, setError };
};

export default useAuth;
