"use client"
import GlobalApi from "@/app/_utils/GlobalApi"
import Image from "next/image"
import { useEffect, useState } from "react"

import './header.css'
import Link from "next/link"

export default function Header({title}) {

    const [data,setData] = useState(null)

    useEffect(()=>{
        try{
            async function headerFunApi() {
                let res = await GlobalApi.HeaderApi()
                setData(res.data)
            }
            headerFunApi()
        }catch(err){
            console.log(err)
        }
    },[])


return (
    <header className="header">
        <Link href='/'>
        {
            data?.logo?.url &&
            <Image
            src={data?.logo?.url}
            alt="Logo"
            width={800}
            height={600}
            priority 
        />
        }

        </Link>

        <div className="title">
            <h2>{title}</h2>
            <span className="line-1"></span>
            <span className="line-2"></span>
        </div>
    </header>
)
}
