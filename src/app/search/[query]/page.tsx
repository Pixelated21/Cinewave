import NavigationBar from "@/components/NavigationBar";
import MovieCard from "@/components/cards/MovieCard";
import MovieGridLayout from "@/components/layouts/MovieGridLayout";
import { Button } from "@/components/ui/button";
import { formatSearchQuery } from "@/lib/utils";
import { Movie } from "@/typescript/interfaces";
import axios from "axios";

const fetchSearchResults = async ({ query }: { query: string }) => {
    const searchTerms = query.trim();
    const response = await axios.get(`http://localhost:3000/api/search/${searchTerms}`);
    return response.data;
};

export default async function SearchPage({ params }: { params: { query: string } }) {
    const { query } = params
    const sanitizedQuery = formatSearchQuery(query, false)
    const searchResultsData = fetchSearchResults({ query: sanitizedQuery })

    const [searchResults] = await Promise.all([searchResultsData])

    const filteredSearchResults = {
        ...searchResults,
        results: [...searchResults.data.results.filter((movie: Movie) => movie.poster_path)]
    }

    return (
        <main className="bg-[#18181B] h-screen overflow-y-auto">
            <NavigationBar className="primary" />
            <section className="overflow-hidden">
                <div className="mx-auto max-w-7xl py-[64px] px-4 sm:px-8 xl:px-2 relative">

                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl sm:text-[32px] font-semibold text-white opacity-20 ">Search results for “{sanitizedQuery}”</h1>
                        <Button className="border-2 border-white bg-gray-700">Filter</Button>
                    </div>

                </div>
            </section>

            <section className="bg-[#18181B]">

                <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-2 mt-6 mb-16 relative">
                    <div className="h-10 w-64 mx-auto rounded-md border-2 border-white bg-gray-700"></div>
                </div>

                <div className="mx-auto max-w-7xl py-[30px] px-4 sm:px-8 xl:px-2">
                    <MovieGridLayout>
                        {filteredSearchResults.results.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </MovieGridLayout>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-2 mb-20 mt-16 relative">
                    <div className="h-10 w-64 mx-auto rounded-md border-2 border-white bg-gray-700"></div>
                </div>
            </section>
        </main>
    )
}