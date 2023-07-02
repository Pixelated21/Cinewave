import { ReactNode } from "react";

export default function LayoutSection({ children }: { children: ReactNode }) {
    return (
        <div className="grid gap-x-3 gap-y-5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 2xl:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
            {children}
        </div>
    )
}