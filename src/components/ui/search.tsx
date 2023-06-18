'use client'
import { FormEvent, useState } from "react";
import { Input } from "./input";
import { useRouter } from "next/navigation";
import { formatSearchQuery } from "@/lib/utils";

export default function MovieSearchInput() {
    const [search, setSearch] = useState('')
    const router = useRouter()

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const sanitizedQuery = formatSearchQuery(search)
        setSearch('')
        router.push(`/search/${sanitizedQuery}`)
    }
    return (
        <form onSubmit={handleSearch}>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} className="w-52 text-white hidden md:block" type="search" placeholder="Have something in mind?" />
        </form>
    )
}