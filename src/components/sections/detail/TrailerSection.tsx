"use client";

import TrailerCard from "@/components/cards/TrailerCard";
import { MovieVideo } from "@/types";
import { useState } from "react";

export default function TrailerSection({
    trailers,
}: {
    trailers: MovieVideo[];
}) {
    return (
        <div className="flex flex-col">
            <h1 className=" text-3xl font-semibold text-white">Trailers</h1>
            <div className="mt-5 h-full">
                <div className="grid grid-cols-3 gap-5">
                    {trailers.map((trailer) => (
                        <TrailerCard key={trailer.id} video={trailer} />
                    ))}
                </div>
            </div>
        </div>
    );
}
