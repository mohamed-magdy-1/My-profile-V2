import localFont from "next/font/local";
import "./globals.css";

// Import Swiper styles
import 'swiper/css/pagination';

import 'swiper/css';
import BackgroundVideos from "./components/BackgroundVideos/BackgroundVideos";

import ProgressBarClient from "./components/ProgressBarProvider/ProgressBarProvider";
import ProgressClient from "./components/ProgressBarProvider/ProgressBarProvider";

const Orbitron = localFont({
  src: "./fonts/Orbitron-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});






export const metadata = {
  title: "Mohamed Magdy",
  description: "Mohamed Magdy is a front-end developer with two years of experience in this field, so he created this site to introduce himself to you. So on this site you can see all the new reviews, communicate with him, and display his skills. Made By Mohamed Magdy",
};

export default function RootLayout({ children }) {



      return (
        <html lang="en">
          <body className={`${Orbitron.variable}`} >
            <div className="container">
              <BackgroundVideos />
              <ProgressClient/>
                {children}
            </div>
            
          </body>
        </html>
      );
    
}


