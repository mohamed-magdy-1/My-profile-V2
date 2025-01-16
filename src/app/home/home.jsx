"use client"
import { useEffect, useState } from "react"
import GlobalApi from "../_utils/GlobalApi"
import './home.css'
import Image from "next/image"


export default function  Home() {


const [data,setData] = useState(null)


    useEffect(()=>{
        try{
            async function HomeFunApi() {
                let res = await GlobalApi.HomeApi()
                setData(res.data)
            }
            HomeFunApi()
        }catch(err){
            console.log(err)
        }
    },[])



    



return (
    <div className="home">
        <div className="my-photo">
            {
                data?.my_photo?.url &&
                <Image 
                className="img-1"
                      src={data?.my_photo?.url} 
                      alt="Background Image" 
                        width={800}
                        height={600}
                        quality={75}
                        priority 
                    />
            }


            {
                data?.cover?.url && 
                <Image 
                className="img-2"
                    src={data?.cover?.url} 
                    alt="Background  Image sun" 
                    quality={75} 
                    width={800}
                    height={600}
                    priority
                    />
            } 


        </div>
        <div className="about-my">
            <h1>{data?.name}</h1>
            <h3>{data?.job}</h3>
            <p>{data?.abou_my}</p>
        </div>
    </div>
  )
}



