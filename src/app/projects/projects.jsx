
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import './projects.css';

// import required modules
import { Autoplay} from 'swiper/modules';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';




import { PiPlusBold } from "react-icons/pi";
import Link from 'next/link';

export default function Projects() {

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };



  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('lottie-web').then(lottie => {
        import('lord-icon-element').then(({ defineElement }) => {
          defineElement(lottie.loadAnimation);
        });
      });
    }
  }, []);

  const [data,setData] = useState(null)

    useEffect(()=>{
        try{
            async function ProjectsFunApi() {
                let res = await GlobalApi.ProjectsApi()
                setData(res)
            }
            ProjectsFunApi()
        }catch(err){
            console.log(err)
        }
    },[])



  return (
    <>
          <Link  href={'/projects/AllProjects'} className='more' >
            <div className='plus'>
            <PiPlusBold />
            </div>
      more projects
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
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="projects_Swiper"
      >
        {data?.map((el) => (
          <SwiperSlide key={el.id}>
            <div className="card-project">
              <div className="projectBigImg">
                <Image
                
                  className="img-1"
                  src={process.env.NEXT_PUBLIC_IMG_URL+`${el?.projectImg.url}`}
                  alt="projectBigImg"
                  layout="fill"
                  quality={75}
                  priority
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
                    <lord-icon
                      src="/icons/globe.json"
                      trigger="loop"
                      delay="2000"
                      style={{width:"30px",height:"30px"}}
                    ></lord-icon>
                    SEE
                  </div>
                )}
                <div className='blog'>
                <lord-icon
                      src="/icons/document.json"
                      trigger="loop"
                      delay="2000"
                      style={{width:"30px",height:"30px"}}
                    ></lord-icon>
                  blog
                  </div>
                </div>
              </div>
            </div>
            <div className='info-card'>
            <div className='icons'>
                  {el?.wap && (
                  <Link href={`${el?.wap}`} target='_blank' className='wap'>
                    <lord-icon
                      src="/icons/globe.json"
                      trigger="loop"
                      delay="2000"
                      style={{width:"30px",height:"30px"}}
                    ></lord-icon>
                    SEE
                  </Link>
                )}
                <Link href={`/blog/${el?.blog?.slug}`} className='blog'>
                <lord-icon
                      src="/icons/document.json"
                      trigger="loop"
                      delay="2000"
                      style={{width:"30px",height:"30px"}}
                    ></lord-icon>
                  blog
                  </Link>
                </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
    </>
  );
}
