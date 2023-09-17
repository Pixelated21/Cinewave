import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster"
import { getServerSession } from "next-auth"
import SessionProvider from "@/providers/SessionProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "CineWave",
    description: "Keep track of your favorite movies and TV shows.",
    twitter: {
        images: "https://cinewave.proximitydev.space/assets/banner.png",
    },
    openGraph: {
        images: "https://cinewave.proximitydev.space/assets/banner.png",
        title: "CineWave",
        description: "Keep track of your favorite movies and TV shows.",
        url: "https://cinewave.proximitydev.space",
    },
    verification: {
        google: "nh6dvmdIjWdwctJuSeXvVPzlC9gsqDjyokmXEKU5nUQ"
    }
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession()
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    {children}
                    <Toaster />
                </SessionProvider>
                {/* <Analytics/> */}
            </body>
        </html>
    );
}
