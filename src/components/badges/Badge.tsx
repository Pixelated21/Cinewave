export default function Badge({ text }: { text: string }) {
    return (
        <span className="inline-flex items-center rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-500/60">{text}</span>
    )
}