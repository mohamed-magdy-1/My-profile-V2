"use client";

import { useEffect, useState } from 'react';
import './allProjects.css';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/header/header';
import dynamic from 'next/dynamic';


const LordIconGlobe = dynamic(() => import('../../components/LordIcon/LordIcon').then((mod) => mod.LordIconGlobe), { ssr: false });
const DynamicPagination = dynamic(() => import('@/app/components/pagination/pagination'), { ssr: false });
import GlobalApi from '@/app/_utils/GlobalApi';

export default function AllProjects() {
  const [data, setData] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function AllProjectsFunApi() {
      try {
        setLoading(true);
        let res = await GlobalApi.AllProjectsApi(pageIndex);
        setData(res.data);
        setPageCount(res?.meta.pagination.pageCount);
        console.log(res)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    AllProjectsFunApi();
  }, [pageIndex]);




  

  
  return (
    <div>
      <Header title="Projects" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='card-AllProjects'>
          {data?.map((item) => (
 <Link href={item?.wap || "#"} target='_blank'  onClick={(e) => { if (!item?.wap) e.preventDefault(); }} className='card-img-pj' key={item.id}>
 {item?.wap && (
  <LordIconGlobe className='AllProjects-icon-Globe'/>
 )}
 {
   item?.projectImg?.url &&
   <Image
   className="img-1"
         src={item?.projectImg?.url} 
         alt="Background Image" 
         layout="fill" 
         quality={75} 
         priority  
       />
 }
<div className='name-card' key={item.id}>{item.title}</div>
</Link>
          ))}
        </div>
      )}
      <DynamicPagination pageCount={pageCount} pageIndex={pageIndex} setPageIndex={setPageIndex} />
    </div>
  );
}
