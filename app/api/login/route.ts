import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    if (username === 'admin' && password === 'admin') {
        return NextResponse.json({ token: 'af71ae8a7d20f61b2f93e1385665a6587714f842861259bc' });
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
