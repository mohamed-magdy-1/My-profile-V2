import { notFound } from "next/navigation";

export async function fetchBlog() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?populate=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=4`, {
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
