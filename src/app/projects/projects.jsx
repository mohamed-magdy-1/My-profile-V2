'use client'
import React, { useEffect, useState  } from 'react';
import './projects.css';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import { PiPlusBold } from "react-icons/pi";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { clearConfig } from 'dompurify';
import Loading2 from '../components/loading-2/loading-2';

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


  if(!data){
    return <Loading2/>
  }




  return (
    <>
      <Link href={"/projects/AllProjects"} className="more">
        <div className="plus">
          <PiPlusBold />
        </div>
        <div className="content-more">more projects</div>
      </Link>



      <div className="cards">
      <div className="Instructions">
        <div className="dots">
          <span className="green"></span>
          <p>Fully designed and developed by me</p>
        </div>
        <div className="dots">
          <span className="orange">
          </span>
          <p>Converted from design to code by me</p>
        </div>
        <div className="dots">
          <span className="red">
      
          </span>
          <p> Learning project inspired by online resources</p>
        </div>
      </div>
        { data.map((el) => (
          <div className="card" key={el.id}>
            <div className="title">
              {el.title}
              <div className='icon'>
                              {el?.wap && (
                                <LordIconGlobe/>
                              )}
                              
                              <LordIconDocument />
              </div>

                  
            </div>
            <div className="dots">
              <span className="green" style={{opacity: el.status_color === "green" ? 1 : 0.5}}></span>
              <span className="orange" style={{opacity: el.status_color === "orange" ? 1 : 0.5 }}></span>
              <span className="red" style={{opacity: el.status_color === "red" ? 1 : 0.5 }}></span>
            </div>
            <Image
              className="img-1"
              src={el?.projectImg?.url ? el?.projectImg?.url : "/default-image.jpg"}
              alt="projectBigImg"
              width={400}
              height={300}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
}



