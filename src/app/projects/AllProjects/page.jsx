"use client"

import { useEffect, useState } from 'react'

import './allProjects.css'
import Image from 'next/image'
// import lottie from 'lottie-web';
// import { defineElement } from 'lord-icon-element';
import Link from 'next/link'
import Header from '@/app/components/header/header'
import Pagination from '@/app/components/pagination/pagination'
import GlobalApi from '@/app/_utils/GlobalApi';

// // define "lord-icon" custom element with default properties
// defineElement(lottie.loadAnimation);



export default function allProjects() {

  const [data,setData] = useState(null)
  const [pageCount,setPageCount] = useState()
  const [pageIndex,setPageIndex] = useState(1)


  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('lottie-web').then(lottie => {
        import('lord-icon-element').then(({ defineElement }) => {
          defineElement(lottie.loadAnimation);
        });
      });
    }
  }, []);

  useEffect(()=>{
      try{
          async function AllProjectsFunApi() {
              let res = await GlobalApi.AllProjectsApi(pageIndex)
              setData(res)
              setPageCount(res?.meta.pagination.pageCount)
          }
          AllProjectsFunApi()
      }catch(err){
          console.log(err)
      }
  },[pageIndex])




  return (
    <div>
      <Header title="Projects"/>
      <div className='card-AllProjects'>
        {
          data?.data?.map((item)=>(
            <Link href={item?.wap || "#"} target='_blank'  onClick={(e) => { if (!item?.wap) e.preventDefault(); }} className='card-img-pj' key={item.id}>
                {item?.wap && (
                    <lord-icon
                    className="icon"
                      src="/icons/globe.json"
                      trigger="loop"
                      delay="2000"
                      style={{width:"50px",height:"50px"}}
                    ></lord-icon>
                )}
                {
                  item?.projectImg?.url &&
                  <Image
                  className="img-1"
                        src={process.env.NEXT_PUBLIC_IMG_URL+item?.projectImg?.url} 
                        alt="Background Image" 
                        layout="fill" 
                        quality={75} 
                        priority  
                      />
                }
            <div className='name-card' key={item.id}>{item.title}</div>
          </Link>
          ))
        }
        
      </div>
      <Pagination pageCount={pageCount} pageIndex={pageIndex} setPageIndex={setPageIndex}/>
    </div>
  )
}
