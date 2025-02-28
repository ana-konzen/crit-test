import { Libre_Baskerville, Nunito } from "next/font/google";
import NavBar from "@/app/components/nav/NavBar";
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
        <div className="p-10 absolute w-block left-[35vw] font-serif">{children}</div>
      </body>
    </html>
  );
}
