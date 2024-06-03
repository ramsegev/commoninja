import { NextResponse } from 'next/server';
import axios from 'axios';
import cookie from 'cookie';
import { IDoc } from "@/app/types/types";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.access_token;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let data;
    try {
        data = await fetchData(section, token);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }

    return NextResponse.json(data);
}
async function fetchData(section: string | null, token: string): Promise<IDoc[]> {
    const urlMap: { [key: string]: string } = {
        widgets: "https://api.commoninja.com/platform/api/v1/widgets",
        projects: "https://api.commoninja.com/platform/api/v1/projects",
        catalog: "https://api.commoninja.com/platform/api/v1/widget-types"
    };

    if (!section || !urlMap[section]) {
        throw new Error('Section not found');
    }

    const response = await axios.get(urlMap[section], {
        headers: {
            "CN-API-Token": token,
        },
    });

    return response.data;
}
