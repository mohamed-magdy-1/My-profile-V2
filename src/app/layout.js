// import localFont from "next/font/local";
// import "./globals.css";

// const Orbitron = localFont({
//   src: "./fonts/Orbitron-VariableFont_wght.ttf",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });






// export const metadata = {
//   title: "Mohamed Magdy",
//   description: "Mohamed Magdy is a front-end developer with two years of experience in this field, so he created this site to introduce himself to you. So on this site you can see all the new reviews, communicate with him, and display his skills. Made By Mohamed Magdy",
// };

// export default async function RootLayout({ children }) {


//     try{
      
//         let res = await fetch(`${process.env.NEXT_PUBLIC_IMG_URL}/api/background-img?populate=*`,{
//           headers:{
//             Authorization:`Bearer ${process.env.NEXT_TOKEN}`
//           }
//         })
//         const data = await res.json();
//         if(data?.data.backgroundImg.url){
//           return (
//             <html lang="en">
//               <body className={`${Orbitron.variable}`} 
//               style={{
//                 backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_URL+data?.data.backgroundImg.url})` ,
//                 objectFit:data.data?.object_fit ? "cover" : "none"
//                 }}>
//                 {children}
//               </body>
//             </html>
//           );
//         }

//     }catch(err){
//       return (
//         <html lang="en">
//           <body className={`${Orbitron.variable}`} >
//             {children}
//           </body>
//         </html>
//       );
//     }
// }




import localFont from "next/font/local";
import "./globals.css";

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
            {children}
          </body>
        </html>
      );
    
}


