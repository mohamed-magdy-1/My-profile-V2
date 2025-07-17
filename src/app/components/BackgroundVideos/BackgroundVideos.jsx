
import { fetchBackgroundVideos } from '@/app/lib/fetchBackgroundVideos';

export default async function BackgroundVideos() {


const data = await fetchBackgroundVideos();





  if (!data) return null;

  return (
    <>
      {data.background?.provider_metadata.resource_type === "video" && (
        <video className="back-vid" loop autoPlay muted playsInline>
          <source src={data.background?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {data.background_Img2?.provider_metadata.resource_type === "video" && (
        <video className="black_hole" loop autoPlay muted playsInline>
          <source src={data.background_Img2?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  )
}
