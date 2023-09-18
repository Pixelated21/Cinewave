'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { PaginationConfig } from "@/types";


export default function PaginationControls({ config }: { config: PaginationConfig }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page: string = searchParams.get('page') ?? '1';

    const handlePrev = () => {
        const page_num = Number(page);

        if (page_num <= 1 || typeof page_num !== 'number') {
            return router.push(`${config.resource}?page=1`);
        } else {
            const prevPage = Math.max(page_num - 1, 1);
            router.push(`${config.resource}?page=${prevPage}`);
        }
    }

    const handleSpecificPage = (pageNumber: number) => {
        if (pageNumber === Number(page)) return;

        // Ensure the page number is within the range [1, 500]
        if (pageNumber <= 0) {
            return router.push(`${config.resource}?page=1`);
        }

        if (pageNumber > 500) {
            return router.push(`${config.resource}?page=500`);
        }

        return router.push(`${config.resource}?page=${pageNumber}`);
    }


    const handleNext = () => {
        const page_num = Number(page);
        const total_pages = Number(config.total_pages);

        if (page_num === 500) return
        if (typeof page_num !== 'number' || typeof total_pages !== 'number') {
            return router.push(`${config.resource}?page=1`);
        }
        else if (page_num >= total_pages || page_num >= 500) {
            return router.push(`${config.resource}?page=500`);
        } else {
            const nextPage = Math.min(page_num + 1, total_pages);
            router.push(`${config.resource}?page=${nextPage}`);
        }
    }

    const renderPageNumbers = () => {
        const currentPage = Number(page);
        const totalPages = config.total_pages > 500 ? 500 : config.total_pages;

        const offset = 2; // Number of pages to show before and after the current page
        const startPage = Math.max(currentPage - offset, 1);
        const endPage = Math.min(currentPage + offset, totalPages);

        const pageNumbers = [];

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="flex gap-x-2">
                {pageNumbers.map((pageNumber) => (
                    <Button
                        variant={'secondary'}
                        onClick={() => handleSpecificPage(pageNumber)}
                        key={pageNumber}
                        className={`${cn('h-8 w-8 text-xs font-medium', Number(page) === pageNumber ? "text-blue-500" : "text-gray-900")
                            }`}
                    >
                        {pageNumber}
                    </Button>
                ))}
            </div>
        );
    };

    return (
        <div className="flex justify-center items-center text-white w-full">
            <ol className="flex justify-center gap-1 text-xs font-medium">
                {!(Number(page) <= 1) && (
                    <>
                        <li>
                            <Button
                                onClick={() => handleSpecificPage(1)}
                                className="h-8 w-8 "
                                variant={'secondary'}
                            >
                                <span className="sr-only">First Page</span>
                                <span>
                                    <ChevronsLeft className="h-3 w-3 " />
                                </span>
                            </Button>
                        </li>

                        <li>
                            <Button
                                onClick={() => handlePrev()}
                                className="h-8 w-8 "
                                variant={'secondary'}
                            >
                                <span className="sr-only">Prev Page</span>
                                <span>
                                    <ChevronLeft className="h-3 w-3 " />
                                </span>
                            </Button>
                        </li>
                    </>
                )}

                {renderPageNumbers()}

                {!(Number(page) >= 500) && (
                    <>
                        <li>
                            <Button
                                onClick={() => handleNext()}
                                className="h-8 w-8 "
                                variant={'secondary'}
                            >
                                <span className="sr-only">Next Page</span>
                                <span>
                                    <ChevronRight className="h-3 w-3 " />
                                </span>
                            </Button>
                        </li>


                        <li>
                            <Button
                                onClick={() => handleSpecificPage(config.total_pages)}
                                className="h-8 w-8 "
                                variant={'secondary'}
                            >
                                <span className="sr-only">Last Page</span>
                                <span>
                                    <ChevronsRight className="h-3 w-3 " />
                                </span>
                            </Button>
                        </li>
                    </>
                )}

            </ol>
        </div>
    );
}

