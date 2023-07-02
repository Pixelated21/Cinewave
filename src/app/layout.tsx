import Breakpoints from "@/components/utils/Breakpoints";
import "./globals.css";
import { Inter } from "next/font/google";
import ScrollToTop from "@/components/utils/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "CineWave",
    description: "Keep track of your favorite movies and TV shows.",
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
                <Breakpoints />
                <ScrollToTop />
            </body>
        </html>
    );
}
