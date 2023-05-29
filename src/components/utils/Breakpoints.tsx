export default function Breakpoints() {
	return (
		<div className='fixed z-50 bottom-5 right-5 grid h-10 w-10 place-items-center rounded-md bg-blue-400'>
			<span className='hidden text-sm font-bold text-white sm:hidden md:hidden lg:hidden xl:hidden 2xl:block'>
				2 XL
			</span>
			<span className='hidden text-sm font-bold text-white sm:hidden md:hidden lg:hidden xl:block 2xl:hidden'>
				XL
			</span>
			<span className='hidden text-sm font-bold text-white sm:hidden md:hidden lg:block xl:hidden 2xl:hidden'>
				LG
			</span>
			<span className='hidden text-sm font-bold text-white sm:hidden md:block lg:hidden xl:hidden 2xl:hidden'>
				MD
			</span>

			<span className='hidden text-sm font-bold text-white sm:block md:hidden lg:hidden xl:hidden 2xl:hidden'>
				SM
			</span>

			<span className='block text-sm font-bold text-white sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden'>
				XS
			</span>
		</div>
	);
}
