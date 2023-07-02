import { getPersonDetailsAction } from "@/app/_actions/person";
import Image from "next/image";

export default async function PeoplePage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const getPersonDetails = getPersonDetailsAction({ id: id });
    const [personDetails] = await Promise.all([getPersonDetails]);

    return (
        <div>
            <h1>People Page</h1>
            <p>{params.id}</p>
            <div className="relative h-40 w-40">
                <Image
                    className="absolute rounded-full object-cover"
                    fill
                    src={`https://image.tmdb.org/t/p/original/${personDetails.profile_path}`}
                    priority
                    alt="hero"
                />
            </div>

            <div>{JSON.stringify(personDetails)}</div>
        </div>
    );
}
