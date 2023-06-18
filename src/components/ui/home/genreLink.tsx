'use client'

interface GenreLinkProps {
    title: string;
    onClick?: () => void;
}

export default function GenreLink({ title, onClick }: GenreLinkProps) {
    return (
        <li onClick={onClick} className="group cursor-pointer">
            <div className="flex flex-col">
                <h2
                    className="text-gray-500 group-hover:text-gray-950 duration-300 font-medium text-xl">
                    {title}
                </h2>
                <span
                    className="h-0.5 w-0 group-hover:w-full bg-blue-700 duration-300"></span>
            </div>
        </li>
    )
}