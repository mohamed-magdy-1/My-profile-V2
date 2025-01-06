'use client';

import GlobalApi from '@/app/_utils/GlobalApi';
import Header from '@/app/components/header/header';
import Pagination from '@/app/components/pagination/pagination';
import React, { useEffect, useState } from 'react';
import './allBlogs.css';
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';

const LordIconDocument = dynamic(() => import('../../components/LordIcon/LordIcon').then((mod) => mod.LordIconDocument), { ssr: false });
const LordIconGlobe = dynamic(() => import('../../components/LordIcon/LordIcon').then((mod) => mod.LordIconGlobe), { ssr: false });

export default function AllBlogs() {
  const [data, setData] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [pageIndex, setPageIndex] = useState(1);


  useEffect(() => {
    async function AllBlogsBlogs() {
      try {
        const res = await GlobalApi.AllBlogsApi(pageIndex);
        if (res?.data) {
          setData(res.data);
          setPageCount(res?.meta?.pagination?.pageCount);
        }
      } catch (err) {
        console.log(err);
      }
    }
    AllBlogsBlogs();
  }, [pageIndex]);





  return (
    <>
      <Header title={"AllBlogs"} />
      <div className="allBlogs">
        {data?.map((item) => (
          <Link key={item.id} className="allBlogs-card" href={`/blog/${item?.slug}`}>
            <div className="allBlogs-img">
              {item?.cover[0]?.url && (
                <Image
                  className="img-1"
                  src={process.env.NEXT_PUBLIC_IMG_URL + item?.cover[0]?.url}
                  alt="Background Image"
                  width={400}
                  height={300}
                  loading="lazy"
                  quality={75}
                />
              )}
            </div>
            <div className="allBlogs-content">
              <h4 className="allBlogs-date">
                {item?.project?.old_date}
                <span className="line-2"></span>
              </h4>
              <div className="icons">
                {item?.project?.wap && (
                    <LordIconGlobe/>
                )}
                  <LordIconDocument/>
              </div>
              <h1 className="allBlogs-title">{item?.title}</h1>
              <p
                className="allBlogs-des"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.project?.des)  }}
              ></p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination pageCount={pageCount} pageIndex={pageIndex} setPageIndex={setPageIndex} />
    </>
  );
}
