"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import Header from "@/app/components/header/header";
import React, { useEffect, useState } from "react";
import "./blogPage.css";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";



export default function BlogPage() {
  let { blogPage } = useParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('lottie-web').then(lottie => {
        import('lord-icon-element').then(({ defineElement }) => {
          defineElement(lottie.loadAnimation);
        });
      });
    }
  }, []);


  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      async function BlogPageFunApi() {
        let res = await GlobalApi.BlogPageApi(blogPage);
        setData(res);
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
        setDataResent(res);
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
                <lord-icon
                  src="/icons/globe.json"
                  trigger="loop"
                  delay="2000"
                  style={{ width: "30px", height: "30px" }}
                ></lord-icon>
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
              layout="fill"
              quality={75}
              priority
            />
          )}
        </div>
        <div
          className="BlogPage_Content_blog"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
      <div className="resent-blog">
        <div className="top-part">
          <h1 className="title">you can also read the new blogs</h1>

          <Link href={`/blog/allBlogs`} className="blog">
            <lord-icon
              src="/icons/document.json"
              trigger="loop"
              delay="2000"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>
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
