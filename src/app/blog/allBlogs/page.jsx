'use client';

import GlobalApi from '@/app/_utils/GlobalApi';
import Header from '@/app/components/header/header';

import React, { useEffect, useState } from 'react';
import './allBlogs.css';
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import Loading2 from '@/app/components/loading-2/loading-2';

const LordIconDocument = dynamic(() => import('../../components/LordIcon/LordIcon').then((mod) => mod.LordIconDocument), { ssr: false });
const LordIconGlobe = dynamic(() => import('../../components/LordIcon/LordIcon').then((mod) => mod.LordIconGlobe), { ssr: false });
const DynamicPagination = dynamic(() => import('@/app/components/pagination/pagination'), { ssr: false });
export default function AllBlogs() {
  const [data, setData] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function AllBlogsBlogs() {
      try {
        setLoading(true);
        const res = await GlobalApi.AllBlogsApi(pageIndex);
        if (res?.data) {
          setData(res.data);
          setPageCount(res?.meta?.pagination?.pageCount);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    AllBlogsBlogs();
  }, [pageIndex]);





  return (
    <>
      <Header title={"AllBlogs"} />
      <div className="allBlogs">
                            {loading ? (<Loading2/>) 
                            : (
                              <>
                                      {data?.map((item) => (
          <Link key={item.id} className="allBlogs-card" href={`/blog/${item?.slug}`}>
              <div className="title">
                <h2>{item.title}</h2>
                <h4 className="blog-date">
                  {item?.project?.old_date}
                </h4>
              </div>
            <div className="allBlogs-img">
              {item?.cover?.url && (
                <Image
                  className="img-1"
                  src={item?.cover?.url}
                  alt="Background Image"
                  width={400}
                  height={300}
                  loading="lazy"
                  quality={75}
                />
              )}
            </div>
            <div className="allBlogs-content">
            <span className="test-span"></span>
              <div className="icons">
                {item?.project?.wap && (
                    <LordIconGlobe/>
                )}
                
                  <LordIconDocument/>
              </div>

              <p
                className="allBlogs-des"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.content)  }}
              ></p>
            </div>
          </Link>
        ))}
                              </>
                            )}

      </div>
      <DynamicPagination pageCount={pageCount} pageIndex={pageIndex} setPageIndex={setPageIndex} />
    </>
  );
}
