'use client'
import { useEffect, useState } from "react"
import GlobalApi from "../_utils/GlobalApi"

import './contact.css'
import Link from "next/link"
import Image from "next/image"

export default function Contact() {


let [name,setName] = useState('')
let [number,setNumber] = useState('')
let [email,setEmail] = useState('')
let [textarea,setTextarea] = useState('')
let [message,setMessage] = useState('')
let [errorMessage,setErrorMessage] = useState('')


const handleSubmit = async (e) => {
    e.preventDefault();

    let data={
        "data": {
        "name": name,
        "number": number,
        "email": email,
        "des": textarea
        }
    }


    try {
        await GlobalApi.contactApi(data); 
        setName('')
        setNumber('')
        setEmail('')
        setTextarea('')
        setMessage('message submitted successfully!');
    } catch (error) {
        console.log(error)
        setErrorMessage('Failed to submit the message. Please try again.');
    }
    
};



// const [data,setData] = useState(null)

// useEffect(()=>{
//     try{
//         async function SocialMediaFunApi() {
//             let res = await GlobalApi.SocialMediaApi()
//             setData(res.data)
//         }
//         SocialMediaFunApi()
//     }catch(err){
//         console.log(err)
//     }
// },[])


return (
    <div className="contact">
        <div className="SocialMedia">
            {/* {
                data?.map((item)=>(
                    <Link key={item.id} href={item?.link || '#'}  target="_blank">
                    {
                    item?.SocialMediaImg[0]?.url &&
                        <Image 
                            src={item?.SocialMediaImg[0]?.url} 
                            alt="Background Image" 
                            layout="fill" 
                            quality={75} 
                            priority  
                        />
                    }
                    </Link>
                ))
            } */}

        </div>
        <form onSubmit={handleSubmit}>
            <div className="t-1">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Enter your number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
            </div>
            <div className="t-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="t-3">
                <textarea
                    placeholder="Your message"
                    value={textarea}
                    onChange={(e) => setTextarea(e.target.value)}
                    required
                />
            </div>
            <div className="t4">
                <button type="submit">Submit</button>
            </div>
        </form>
        {
            message ?
                    <div className="message">
                    {message}
                </div> :
                errorMessage ? 
                <div className="errorMessage">
                {errorMessage}
            </div>  : ""
        }

    </div>
);
}
