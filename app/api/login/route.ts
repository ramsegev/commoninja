import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    if (username === 'admin' && password === 'admin') {
        return NextResponse.json({ token: process.env.TOKEN });
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
