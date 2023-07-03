"use client";

import LayoutSection from "@/components/layouts/LayoutSection";
import { Movie } from "@/types";
import MovieCardBlurEffect from "@/components/cards/movie/MovieCardBlurEffect";
import { ResourceTypes } from "@/types";
import { getGenres } from "@/lib/utils";
import { genres } from "@/data/genres";

interface MovieSectionProps {
    resource: { results: Movie[] };
    title: string;
    type: ResourceTypes;
}

export default function ResourceListingSection({
    resource,
    title,
    type,
}: MovieSectionProps) {
    const filteredResource = resource.results.map(({ genre_ids, ...movie }) => {
        const genre = getGenres(genre_ids!, genres);
        return { ...movie, genre_ids: genre };
    });

    return (
        <section className="bg-[#18181B]">
            <div className="mx-auto max-w-7xl px-4 py-[30px] sm:px-8 xl:px-2">
                <div className="flex flex-col gap-y-5">
                    <div className="flex flex-row items-center gap-x-10 overflow-hidden">
                        <div className="group">
                            <h2 className="cursor-pointer text-2xl font-semibold text-gray-500 duration-300 group-hover:text-gray-100">
                                {title}
                            </h2>
                            <span className="h-0.5 w-0 bg-blue-700 duration-300 group-hover:w-full"></span>
                        </div>
                    </div>

                    <LayoutSection>
                        {filteredResource.map((resource: Movie) => (
                            <MovieCardBlurEffect
                                type={type}
                                key={resource.id}
                                resource={resource}
                            />
                        ))}
                    </LayoutSection>
                </div>
            </div>
        </section>
    );
}
