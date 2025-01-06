"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import Header from "@/app/components/header/header";
import React, { useEffect, useState } from "react";
import "./blogPage.css";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';

const LordIconDocument = dynamic(() => import('../../components/LordIcon/LordIcon').then((mod) => mod.LordIconDocument), { ssr: false });
const LordIconGlobe = dynamic(() => import('../../components/LordIcon/LordIcon').then((mod) => mod.LordIconGlobe), { ssr: false });

export default function BlogPage() {
  let { blogPage } = useParams();




  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      async function BlogPageFunApi() {
        let res = await GlobalApi.BlogPageApi(blogPage);
        setData(res.data);
      }
      BlogPageFunApi();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [dataResent, setDataResent] = useState(null);

  useEffect(() => {
    try {
      async function ResentFunApi() {
        let res = await GlobalApi.ResentAddBlogApi();
        setDataResent(res.data);
      }
      ResentFunApi();
    } catch (err) {
      console.log(err);
    }
  }, []);


  return (
    <>
      <Header title={data?.title} />
      <div className="BlogPage">
        <div className="BlogPage_Top_content">
          <h1>{data?.title}</h1>

          <div className="icons">
            {data?.project?.wap && (
              <Link
                href={`${data?.project?.wap}`}
                target="_blank"
                className="wap"
              >
              <LordIconGlobe/>
                SEE
              </Link>
            )}

            <h4 className="blog-date">
              {data?.project?.old_date}
              <span className="line-2"></span>
            </h4>
          </div>
        </div>
        <div className="BlogPage_Image">
          {data?.cover[0]?.url && (
            <Image
              className="img-1"
              src={process.env.NEXT_PUBLIC_IMG_URL + data?.cover[0]?.url}
              alt="BlogPage Image"
              width={400}
              height={300}
              quality={75}
              priority
            />
          )}
        </div>
        <div
          className="BlogPage_Content_blog"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.content)  }}
        />
      </div>
      <div className="resent-blog">
        <div className="top-part">
          <h1 className="title">you can also read the new blogs</h1>

          <Link href={`/blog/allBlogs`} className="blog">
          <LordIconDocument/>
            AllBlogs
          </Link>
        </div>
        <div className="card">
          <span className="right"></span>
          <div className="box">
            {dataResent?.map((item) => (
              <Link
                href={`/blog/${item?.slug}`}
                target="_blank"
                className="card-img-pj"
                key={item.id}
              >
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
                <div className="name-card" key={item.id}>
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
          <span className="left"></span>
        </div>
      </div>
    </>
  );
}
