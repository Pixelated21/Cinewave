'use client'

import { WatchList, addToWatchlistAction } from "@/app/_actions/movie";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { watchlist } from "@/lib/db/schema/watchlist";



export default function AddToWatchListButton(resource: WatchList) {

    const handleAddToWatchlist = async (resource: WatchList) => {
        try {
            const res = await fetch('/api/watchlist', {
                method: 'POST',
                body: JSON.stringify({
                    resource_id: resource.resource_id,
                    user_id: resource.user_id,
                    poster_path: resource.poster_path,
                    title: resource.title,
                    release_date: resource.release_date,
                    resource_type: resource.resource_type
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                if (res.status === 409) {
                    return toast({
                        title: 'You have already added this movie to your watchlist',
                        description: 'You can view your watchlist in your profile.',
                        duration: 3000,
                    })
                }

                if (res.status === 401 || res.status === 403) {
                    return toast({
                        title: 'You are not logged in',
                        description: 'Please login to add movies to your watchlist.',
                        duration: 3000,
                    })
                }

                return toast({
                    title: 'Something went wrong',
                    description: 'Please try again later.',
                    duration: 3000,
                })
            }

            return toast({
                title: `${resource.title} added to watchlist`,
                description: 'You can view your watchlist in your profile.',
                duration: 3000,
            })
        }
        catch (e) {
            return toast({
                title: 'Something went wrong',
                description: 'Please try again later.',
                duration: 3000,
            })
        }
    }

    return (
        <form className="w-full" action={() => handleAddToWatchlist(resource)}>
            <Button size={'sm'} className="w-full bg-blue-600 " type='submit'>Add To WatchList</Button>
        </form>
    )
}