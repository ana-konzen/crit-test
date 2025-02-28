import { Libre_Baskerville, Nunito } from "next/font/google";
import NavBar from "@/app/layout/nav/NavBar";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${baskerville.variable} ${nunito.variable} antialiased`}>
        <NavBar />
        <div className="p-4 absolute xl:right-[50px] right-0 w-[var(--content-width)] flex lg:justify-center justify-end font-serif">
          {children}
        </div>
      </body>
    </html>
  );
}
