import { Libre_Baskerville, Nunito } from "next/font/google";
import NavBar from "@/app/layout/nav/NavBar";
import BurgerMenu from "@/app/layout/nav/BurgerMenu";

import "./globals.css";

const baskerville = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Designing Design Crits",
  description: "A guide to running effective design critiques",
};

export const revalidate = 60;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${baskerville.variable} ${nunito.variable} antialiased`}>
        <NavBar />
        <BurgerMenu />
        <div className="p-4 lg:pl-16 absolute w-screen right-0 md:w-content-md flex md:justify-center font-serif">
          <div className="flex relative lg:w-[75%] mt-28 w-full flex-col md:max-w-block-w-md md:mt-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
