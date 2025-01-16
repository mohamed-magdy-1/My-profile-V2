"use client";

import { useEffect, useState } from 'react';
import './allProjects.css';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/header/header';
import dynamic from 'next/dynamic';
import GlobalApi from '@/app/_utils/GlobalApi';

 const LordIconDocument = dynamic(() => import('../../components/LordIcon/LordIcon').then((mod) => mod.LordIconDocument), { ssr: false });
const LordIconGlobe = dynamic(() => import('../../components/LordIcon/LordIcon').then((mod) => mod.LordIconGlobe), { ssr: false });
const DynamicPagination = dynamic(() => import('@/app/components/pagination/pagination'), { ssr: false });


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
    <div className='card-AllProjects'>
      <Header title="Projects" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        
              <div className="cards">
                {data.map((el) => (
                  <div className="card" key={el.id}>
                    <div className="title">
                      {el.title}
                      <div className='icon'>
                                      {/* {el?.project?.wap && ()} */}
                                      <LordIconGlobe/>
                                      <LordIconDocument />
                      </div>
        
                          
                    </div>
                    <div className="dots">
                      <span className="green"></span>
                      <span className="orange"></span>
                      <span className="red"></span>
                    </div>
                    <Image
                      className="img-1"
                      src={`${el?.projectImg.url}`}
                      alt="projectBigImg"
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
      )}
      <DynamicPagination pageCount={pageCount} pageIndex={pageIndex} setPageIndex={setPageIndex} />
    </div>
  );
}
