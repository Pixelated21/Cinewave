"use client";

import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }) {
    const overlay = useRef();
    const wrapper = useRef();
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper]
    );

    const onKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <div
            ref={overlay}
            className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/80"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="absolute left-1/2 top-1/2 w-[985px] -translate-x-1/2 -translate-y-1/2 sm:w-[985px] md:w-[985px] lg:w-[985px]"
            >
                {children}
            </div>
        </div>
    );
}
