
export async function fetchBackgroundVideos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/background-img?populate=*`, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
    next: { revalidate: 3600 }
  });


  const data = await res.json();

  return data.data;
}
