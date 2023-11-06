export const dynamic = 'force-dynamic';
export default function HomeLayout(props: { children: React.ReactNode }) {
    return (
        <div>
            {props.children}
        </div>
    )
}