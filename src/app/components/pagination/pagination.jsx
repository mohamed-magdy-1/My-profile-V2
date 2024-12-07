'use client'

import './pagination.css'
import { IoIosArrowBack ,IoIosArrowForward} from "react-icons/io";
export default function Pagination({pageCount,pageIndex,setPageIndex}) {


    const prevSlide = () => {
        setPageIndex(pageIndex === 1 ? pageCount : (prev) => prev - 1);
    };

    const nextSlide = () => {
        setPageIndex(pageIndex === pageCount ? 1 : (prev) => prev + 1);
    };



    const getPagesNumberPagination = () => {
        const pages = [];
        const range = 2; 
        
        
        if (pageCount > 1) {
            pages.push(1);
        }

        for (let i = Math.max(range, pageIndex - range); i <= Math.min(pageCount - 1, pageIndex + range); i++) {
            pages.push(i);
        }
        
        
        if (pageIndex > range + 2) {
            pages.splice(1, 0, '...');
        }
        if (pageIndex < pageCount - (range + 1)) {
            pages.push('...');
        }
        
        
        if (pageCount > 1) {
            pages.push(pageCount);
        }
        
        
        
        return pages;
    }


  const  windowToTop = ()=>{
    window.scrollTo(0,0)
  }

const PaginationArray = getPagesNumberPagination()

return (
    <div className='Pagination'>
        <ul>
            <li onClick={() => prevSlide()}><IoIosArrowBack/></li>
            {
                PaginationArray?.map((el)=>(
                    <li key={el} onClick={()=> {
                        typeof el === 'number' && setPageIndex(el)
                        windowToTop()
                    }}
                    style={{ backgroundColor: pageIndex === el ? "#007bff" : "transparent" }}
                    >{el}</li>
                ))
            }
            <li onClick={() => nextSlide()}><IoIosArrowForward/></li>
        </ul>
    </div>
)
}
