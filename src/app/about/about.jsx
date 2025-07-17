"use client";

import './about.css';

import { Pagination } from 'swiper/modules';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import ImgISliderAbout from '../components/imgISliderAbout/imgISliderAbout';
import HexGrid from '../components/test/HexGrid';

export default function About({ data }) {
  const [open, setOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [safeHtmls, setSafeHtmls] = useState([]);

  // sanitize all content_about when data is ready
  useEffect(() => {
    async function sanitizeContent() {
      const DOMPurify = (await import('dompurify')).default;

      const sanitized = data?.all_about?.map(item =>
        DOMPurify.sanitize(item?.content_about || '')
      );
      setSafeHtmls(sanitized);
    }

    sanitizeContent();
  }, [data]);

  return (
    <div className='about'>
      <Swiper
        direction={'vertical'}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data?.all_about?.map((slider, index) => (
          <SwiperSlide className="about-sc" key={slider.id}>
            <div className="title-about">{slider.title}</div>

            <div className="img-container">
              {slider?.skill_icon && <HexGrid data={slider?.skill_icon} />}
            </div>

            {safeHtmls[index] && (
              <div
                className="content-about"
                dangerouslySetInnerHTML={{ __html: safeHtmls[index] }}
              />
            )}

            <div className="img-container">
              {slider?.my_images?.map((img, i) => (
                <Image
                  onClick={() => {
                    setOpen(true);
                    setImgIndex(i);
                  }}
                  key={img.id}
                  className="img-certificate"
                  src={img?.url}
                  alt="Background Image"
                  width={400}
                  height={300}
                  loading="lazy"
                />
              ))}
            </div>

            <ImgISliderAbout
              data={data}
              imgIndex={imgIndex}
              setImgIndex={setImgIndex}
              open={open}
              setOpen={setOpen}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
