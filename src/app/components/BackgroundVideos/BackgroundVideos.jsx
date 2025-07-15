'use client'
import GlobalApi from '@/app/_utils/GlobalApi';
import { useEffect, useState } from 'react'

export default function BackgroundVideos() {
  const [data, setData] = useState(null);


    useEffect(()=>{
        try{
            async function HomeFunApi() {
                let res = await GlobalApi.BackgroundVideosApi()
                setData(res.data)
                
            }
            HomeFunApi()
        }catch(err){
            console.log(err)
        }
    },[])







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
