'use client'
import React, { useEffect, useState  } from 'react';
import './projects.css';
import { Autoplay } from 'swiper/modules';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import { PiPlusBold } from "react-icons/pi";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';

const LordIconDocument = dynamic(() => import('../components/LordIcon/LordIcon').then((mod) => mod.LordIconDocument), { ssr: false });
const LordIconGlobe = dynamic(() => import('../components/LordIcon/LordIcon').then((mod) => mod.LordIconGlobe), { ssr: false });




export default function Projects() {
  const [data, setData] = useState(null);



  

    useEffect(() => { 
      async function fetchData() {
        try {
          let res = await GlobalApi.ProjectsApi();
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
    }
    fetchData();
  }, []);


  return (
    <>
      <Link href={'/projects/AllProjects'} className='more'>
        <div className='plus'>
          <PiPlusBold />
        </div>
        <div className='content-more'>more projects</div>
      </Link>

      <div className="projects">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="projects_Swiper"
        >
          {data?.map((el) => (
            <SwiperSlide key={el.id}>
              <div className="card-project">
                <div className="projectBigImg">
                  <Image
                    className="img-1"
                    src={process.env.NEXT_PUBLIC_IMG_URL + `${el?.projectImg.url}`}
                    alt="projectBigImg"
                    width={400}
                    height={300}
                    loading="lazy" 
                  />
                </div>
                <div className="projectContent">
                  <div className="project-old_date">
                    {el.old_date}
                    <span className="line-2"></span>
                  </div>
                  <div className="project-title">{el.title}</div>
                  <div className="project-des">{el.des}</div>
                  <div className='icons'>
                  {el?.wap && (
                  <div className='wap'>
                    <LordIconGlobe/>
                    SEE
                  </div>
                )}
                <div className='blog'>
                    <LordIconDocument />
                  blog
                  </div>
                </div>
                </div>
              </div>
              <div className='info-card'>
            <div className='icons'>
                  {el?.wap && (
                  <Link href={`${el?.wap}`} target='_blank' className='wap'>
                    <LordIconGlobe/>
                    SEE
                  </Link>
                )}
                <Link href={`/blog/${el?.blog?.slug}`} className='blog'>
                <LordIconDocument />
                  blog
                  </Link>
                </div>
            </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}



