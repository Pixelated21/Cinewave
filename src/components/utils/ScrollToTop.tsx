"use client";

import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
    const [scrolled, setScrolled] = useState(false);

    const changeBackground = () => {
        if (window.scrollY > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", changeBackground);

        return () => {
            document.removeEventListener("scroll", changeBackground);
        };
    }, []);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            <div className={`fixed bottom-5 right-5 z-50`}>
                <button
                    onClick={scrollToTop}
                    className={`flex h-12 w-12 rotate-180 items-center justify-center rounded-full bg-[#18181B] text-gray-400 duration-300 hover:bg-gray-700`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 rotate-180 transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default ScrollToTop;
