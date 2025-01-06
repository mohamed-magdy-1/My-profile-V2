import { NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (req) => {
  try {
    const endpoint = decodeURIComponent(req.nextUrl.searchParams.get('endpoint'));
    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 });
    }

    const token = process.env.NEXT_TOKEN; 
    const apiUrl = `https://strapi-my-profile-v2.onrender.com/api${endpoint}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
};


export const POST = async (req) => {
  try {
    const body = await req.json(); 
    const endpoint = decodeURIComponent(req.nextUrl.searchParams.get('endpoint'));
    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 });
    }

    const token = process.env.NEXT_TOKEN; 
    const apiUrl = `https://strapi-my-profile-v2.onrender.com/api${endpoint}`;

    const response = await axios.post(apiUrl,body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
};
