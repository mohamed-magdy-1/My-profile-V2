import React, { useMemo, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoMdCloseCircleOutline } from "react-icons/io";
import Image from 'next/image';

export default function ImgISliderAbout({ data, imgIndex, setImgIndex, open, setOpen }) {
    const arrayBigImg = useMemo(() => {
        let allImages = [];
        data?.all_about.forEach((el) => {
            if (el?.my_images) {
                allImages = el?.my_images;
            }
        });
        return allImages;
    }, [data]);

    function prevImg() {
        setImgIndex((prev) => (prev === 0 ? arrayBigImg.length - 1 : prev - 1));
    }

    function nextImg() {
        setImgIndex((prev) => (prev === arrayBigImg.length - 1 ? 0 : prev + 1));
    }


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setOpen(false); 
            if (e.key === "ArrowLeft") prevImg(); 
            if (e.key === "ArrowRight") nextImg(); 
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setOpen, prevImg, nextImg]);

    if (!open) return null;

    return (
        <div className="big-img" style={{ display: open ? "flex" : "none" }}>
            <div className="Close" onClick={() => setOpen(false)}>
                <IoMdCloseCircleOutline />
            </div>
            {arrayBigImg[imgIndex]?.url && (
                <Image
                    className="img-1"
                    src={arrayBigImg[imgIndex].url}
                    alt="bigImg"
                    width={400}
                    height={300}
                    loading="lazy"
                />
            )}
            <div className="arrows">
                <button onClick={prevImg}><IoIosArrowBack /></button>
                <button onClick={nextImg}><IoIosArrowForward /></button>
            </div>
            <div className="indicator">
                {imgIndex + 1} / {arrayBigImg.length}
            </div>



            <div className="keyboard-navigation-message">
                <p>Use the <strong>Arrow Keys</strong> (← →) to navigate between images.</p>
            </div>

        </div>
    );
}