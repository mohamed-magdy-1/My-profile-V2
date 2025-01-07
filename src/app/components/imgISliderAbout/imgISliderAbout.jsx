import React, { useEffect, useState } from 'react'


import { IoIosArrowBack ,IoIosArrowForward ,IoMdCloseCircleOutline } from "react-icons/io";
import Image from 'next/image';

export default function ImgISliderAbout({data,imgIndex,setImgIndex,open,setOpen}) {


const [arrayBigImg,setArrayBigImg] = useState([])


    useEffect(()=>{
        function arrayAllBigImg(){
                    data?.all_about.map((el)=>{
            if(el?.my_images){
                    setArrayBigImg(el?.my_images)
            }
        })
        }
        arrayAllBigImg()
    },[data])


    function prevImg(){
        setImgIndex(imgIndex == 0 ? arrayBigImg.length - 1 : imgIndex - 1)
    }
    function nextImg(){
        setImgIndex(imgIndex == arrayBigImg.length - 1 ? 0 : imgIndex + 1  )
    }


  return (
    <div
    className="big-img"
    style={{ display: open ? "flex" : "none" }}
>
    <div className='Close' onClick={()=>setOpen(false)}><IoMdCloseCircleOutline/> </div>
    {arrayBigImg[imgIndex]?.url !== undefined && (
    <Image
        className="img-1"
        src={`${arrayBigImg[imgIndex]?.url}`}
        alt={"bigImg"}
        width={400}
        height={300}
        loading="lazy"
        />
    )}
    <div className='arrows'>
    <button onClick={()=> prevImg()}><IoIosArrowBack/></button>
    <button onClick={()=> nextImg()}><IoIosArrowForward/></button>
    </div>

</div>
  )
}
