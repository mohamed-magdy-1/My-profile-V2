"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import Header from "@/app/components/header/header";
import React, { useEffect, useState } from "react";
import "./blogPage.css";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const LordIconDocument = dynamic(
  () =>
    import("../../components/LordIcon/LordIcon").then(
      (mod) => mod.LordIconDocument
    ),
  { ssr: false }
);
const LordIconGlobe = dynamic(
  () =>
    import("../../components/LordIcon/LordIcon").then(
      (mod) => mod.LordIconGlobe
    ),
  { ssr: false }
);

export default function BlogPage() {
  const { blogPage } = useParams();
  const [data, setData] = useState(null);
  const [dataResent, setDataResent] = useState(null);
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GlobalApi.BlogPageApi(blogPage);
        setData(res.data);

        const DOMPurify = (await import("dompurify")).default;
        const clean = DOMPurify.sanitize(res.data?.content || "");
        setSafeHtml(clean);
      } catch (err) {
        console.log(err);
      }
    }
    if (blogPage) fetchData();
  }, [blogPage]);

  useEffect(() => {
    async function fetchResent() {
      try {
        const res = await GlobalApi.ResentAddBlogApi();
        setDataResent(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchResent();
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
                <LordIconGlobe />
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
          <Image
            className="img-1"
            src={data?.cover?.url || "/default-image.jpg"}
            alt="BlogPage Image"
            width={400}
            height={300}
            priority
          />
        </div>

        {/* ✅ safe HTML injected only after sanitizing in client */}
        {safeHtml && (
          <div
            className="BlogPage_Content_blog"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        )}
      </div>

      <div className="resent-blog">
        <div className="top-part">
          <h1 className="title">you can also read the new blogs</h1>

          <Link href={`/blog/allBlogs`} className="blog">
            <LordIconDocument />
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
                key={item.id}
              >
                <div className="card-img-pj">
                  <Image
                    className="img-1"
                    src={item?.cover?.url || "/default-image.jpg"}
                    alt="Background Image"
                    layout="fill"
                    quality={75}
                    priority
                  />
                  <div className="name-card" key={item.id}>
                    {item.title}
                  </div>
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
