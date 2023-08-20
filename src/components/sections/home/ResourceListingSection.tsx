"use client";

import LayoutSection from "@/components/layouts/LayoutSection";
import { Movie, Series } from "@/types";
import MovieCardBlurEffect from "@/components/cards/movie/MovieCardBlurEffect";
import { ResourceTypesEnum } from "@/types";
import { getGenres } from "@/lib/utils";
import { genres } from "@/data/genres";
import SeriesCardBlurEffect from "@/components/cards/series/SeriesCardBlurEffect";
import MovieCard from "@/components/cards/movie/MovieCard";
import SeriesCard from "@/components/cards/series/SeriesCard";

interface ResourceListingSectionProps {
    resource: { results: Movie[] };
    title: string;
    type: ResourceTypesEnum;
}

export default function ResourceListingSection({
    resource,
    title,
    type,
}: ResourceListingSectionProps) {
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
                        {type === ResourceTypesEnum.MOVIE
                            ? filteredResource.map((resource: Movie) => (
                                // <MovieCardBlurEffect
                                //     key={resource.id}
                                //     resource={resource}
                                // />
                                <MovieCard resource={resource} key={resource.id} />
                            ))
                            : type === ResourceTypesEnum.SERIES
                                ? filteredResource.map((resource) => (
                                    <SeriesCard
                                        key={resource.id}
                                        //   FIXME: Implement Proper Type hinting
                                        //   @ts-ignore
                                        resource={resource}
                                    />
                                ))
                                : null}
                    </LayoutSection>
                </div>
            </div>
        </section>
    );
}
