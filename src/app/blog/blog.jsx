import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import "./blog.css";
import Link from "next/link";
import Image from "next/image";
import { PiPlusBold } from "react-icons/pi";

const Blog = () => {
  const [data, setData] = useState(null);

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
    async function ProjectsFunApi() {
      try {
        let res = await GlobalApi.BlogApi();
        setData(res);
      } catch (err) {
        console.log(err);
      }
    }
    ProjectsFunApi();
  }, []);

  return (
    <>
      <Link href={'/blog/allBlogs'} className='more'>
        <div className='plus'>
          <PiPlusBold />
        </div>
        more
      </Link>
      <div className="allBlog">
        {data?.map((item) => (
          <Link key={item.id} className="blog-card" href={`/blog/${item?.slug}`}>
            <div className="blog-img">
              {item?.cover[0]?.url && (
                <Image
                  className="img-1"
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${item?.cover[0]?.url}`}
                  alt="Background Image"
                  layout="fill"
                  quality={75}
                  priority
                />
              )}
            </div>
            <div className="blog-content">
              <h4 className="blog-date">{item?.project?.old_date}
                <span className="line-2"></span>
              </h4>
              <div className='icons'>
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
              <h1 className="blog-title">{item?.title}</h1>
              <p className="blog-des" dangerouslySetInnerHTML={{ __html: item?.project?.des }}></p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Blog;
