import { notFound } from "next/navigation";

export async function fetchHome() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home?populate=*`, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
    next: { revalidate: 3600 }
  });

  if (res.status == 404) {
    notFound(); 
  }
  const data = await res.json();

  return data.data;
}
