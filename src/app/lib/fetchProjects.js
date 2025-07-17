import { notFound } from "next/navigation";

export async function fetchProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=6`, {
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
