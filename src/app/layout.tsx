import Breakpoints from "@/components/utils/Breakpoints";
import "./globals.css";
import { Inter } from "next/font/google";
import ScrollToTop from "@/components/utils/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "CineWave",
    description: "Keep track of your favorite movies and TV shows.",
    twitter: {
        images: "https://www.pngkit.com/png/detail/13-135262_movie-moviemaker-film-cut-svg-png-icon-free.png",
    },
    openGraph: {
        images: "https://www.pngkit.com/png/detail/13-135262_movie-moviemaker-film-cut-svg-png-icon-free.png",
        title: "CineWave",
        description: "Keep track of your favorite movies and TV shows.",
        url: "https://cinewave.vercel.app/",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                {/* <Breakpoints /> */}
                {/* <ScrollToTop /> */}
                {/* <Analytics/> */}
            </body>
        </html>
    );
}
