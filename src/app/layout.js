import localFont from "next/font/local";
import "./globals.css";

// Import Swiper styles
import 'swiper/css/pagination';

import 'swiper/css';

const Orbitron = localFont({
  src: "./fonts/Orbitron-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});






export const metadata = {
  title: "Mohamed Magdy",
  description: "Mohamed Magdy is a front-end developer with two years of experience in this field, so he created this site to introduce himself to you. So on this site you can see all the new reviews, communicate with him, and display his skills. Made By Mohamed Magdy",
};

export default async function RootLayout({ children }) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/background-img?populate=*`,{
  headers:{
    'Authorization': `Bearer ${process.env.NEXT_TOKEN}`,
    'Content-Type': 'application/json',
  }});
  const data = await res.json();


      return (
        <html lang="en">
          <body className={`${Orbitron.variable}`} >
            <div className="container">
              {
                data?.data.background?.provider_metadata.resource_type === "video" &&
                <video className="back-vid" loop autoPlay muted playsInline>
                <source src={data?.data.background?.url} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
              }
                            {
                data?.data.background_Img2?.provider_metadata.resource_type === "video" &&
                <video className="black_hole" loop autoPlay muted playsInline>
                <source src={data?.data.background_Img2?.url} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
              }

            {children}
            </div>
            
          </body>
        </html>
      );
    
}


