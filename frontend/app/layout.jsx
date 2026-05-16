import { Syne, DM_Sans, Poppins } from "next/font/google"; 
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "600", "700", "800"] });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["300", "400", "500"] });


const poppins = Poppins({ 
  subsets: ["latin"], 
  variable: "--font-poppins", 
  weight: ["200", "300", "400", "500", "600"] 
});

export const metadata = { 
  title: "ServiceBoard", 
  description: "Mini Service Request Board" 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dm.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}