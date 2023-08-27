import Link from 'next/link'
import AddToWatchListButton from '@/components/resource-add-to-watchlist-button'

export default function Home() {

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className='flex flex-col gap-y-4 items-center'>
        <Link href={'/home'} className='font-semibold text-2xl'>Click Here 🥹</Link>
      </div>
    </main>
  )
}
