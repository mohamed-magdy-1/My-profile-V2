'use client';

import GlobalApi from '@/app/_utils/GlobalApi';
import Header from '@/app/components/header/header';
import Pagination from '@/app/components/pagination/pagination';
import React, { useEffect, useState } from 'react';
import './allBlogs.css';
import Link from 'next/link';
import Image from 'next/image';



export default function AllBlogs() {
  const [data, setData] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [pageIndex, setPageIndex] = useState(1);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('lottie-web').then(lottie => {
        import('lord-icon-element').then(({ defineElement }) => {
          defineElement(lottie.loadAnimation);
        });
      });
    }
  }, []);


  useEffect(() => {
    async function fetchBlogs() {
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
    fetchBlogs();
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
                  layout="fill"
                  quality={75}
                  priority
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
                    <lord-icon
                    className="icon"
                      src="/icons/globe.json"
                      trigger="loop"
                      delay="2000"
                      style={{width:"50px",height:"50px"}}
                    ></lord-icon>
                )}
                <lord-icon
                  src="/icons/document.json"
                  trigger="loop"
                  delay="2000"
                  style={{ width: "50px", height: "50px" }}
                ></lord-icon>
              </div>
              <h1 className="allBlogs-title">{item?.title}</h1>
              <p
                className="allBlogs-des"
                dangerouslySetInnerHTML={{ __html: item?.project?.des }}
              ></p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination pageCount={pageCount} pageIndex={pageIndex} setPageIndex={setPageIndex} />
    </>
  );
}
