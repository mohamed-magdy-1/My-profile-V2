import { notFound } from "next/navigation";

export async function fetchHome() {

  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home?populate=*`, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  }
  });
// ,
//     next: { revalidate: 3600 }
  if (res.status == 404) {
    console.log(res);
    notFound(); 
  }
  const data = await res.json();
console.log(data);
  return data.data;
  } catch (error) {
    console.log(error);
  }

}
