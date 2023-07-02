import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen  items-center justify-center p-24">
      <Link href={'/home'} className='font-semibold text-2xl'>Click Here 🥹</Link>
    </main>
  )
}
