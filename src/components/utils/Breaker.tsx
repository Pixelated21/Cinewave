export default function Breaker({ height = '20px', width = '20px' }: { height?: string, width?: string }) {
    return (
        <div aria-hidden style={{ height, width }}/>
    )
}