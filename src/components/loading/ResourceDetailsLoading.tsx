import NavigationBar from "@/components/NavigationBar";

export default function ResourceDetailsLoading() {
    return (
        <main id="main" className="h-screen overflow-y-auto bg-[#18181B]">
            <section className="relative h-[571px] shadow-md xl:h-[671px]">
                <NavigationBar className="absolute z-10 w-full" />
                <div className="absolute h-full w-full">
                    <div className="relative flex h-full items-end">
                        <div className="h-full w-full absolute bg-[#18181B] animate-pulse"></div>
                        <div className="absolute h-full w-full bg-black bg-opacity-50"></div>
                        <div className="absolute h-80 w-full bg-gradient-to-b -bottom-2 from-[#18181B]/0 to-[#18181B]"></div>
                    </div>
                </div>
            </section>

            <section className="container relative z-10 -mt-[440px] md:-mt-60 mb-20 px-0 sm:px-10">
                <div className="flex h-full justify-center sm:justify-start flex-col md:flex-row">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="relative h-[250px] w-[150px] md:h-[350px] md:w-[200px] rounded-sm bg-gray-700 animate-pulse xl:h-[400px] xl:w-[250px] 2xl:h-[400px] 2xl:w-[300px]"></div>
                    </div>

                    <div className=" flex-1 px-10 ">
                        <div className="mt-8 flex flex-col gap-y-2 items-center md:items-start">
                            <div className="h-10 w-80 rounded-sm animate-pulse bg-gray-700"></div>
                            <div className="mt-2.5 flex justify-center md:items-start gap-x-2">
                                <div className="w-[75px] h-3.5 bg-gray-700 animate-pulse rounded"></div>
                                <div className="w-24 h-3.5 bg-gray-700 animate-pulse rounded"></div>
                            </div>
                            <div className="w-60 hidden md:block h-3.5 bg-gray-700  animate-pulse rounded"></div>
                        </div>

                        <div className="mt-9 max-w-[608px] flex flex-col items-center md:items-start  gap-y-2">
                            <p className="w-full h-3.5 animate-pulse bg-gray-700 rounded"></p>
                            <p className="w-5/6 h-3.5 animate-pulse bg-gray-700 rounded"></p>
                            <p className="w-60 h-3.5 animate-pulse bg-gray-700 rounded"></p>
                            <p className="w-3/4 h-3.5 animate-pulse bg-gray-700 rounded"></p>
                            <p className="w-1/2 h-3.5 animate-pulse bg-gray-700 rounded"></p>
                        </div>

                        <div className="mt-9 hidden lg:block">
                            <div className="w-20 h-[28px] bg-gray-700 animate-pulse rounded"></div>

                            <div className="mt-8 flex flex-col">
                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-48 ">
                                        <div className="w-14 h-[24px] bg-gray-700 animate-pulse rounded"></div>
                                    </span>
                                    <div className="flex flex-1 flex-wrap gap-1">
                                        {Array(5).fill(0).map(
                                            (_, index) => (
                                                <div key={index} className="animate-pulse h-[18px] w-12 rounded-md bg-gray-700"></div>
                                            ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-48 ">
                                        <div className="w-14 h-[24px] bg-gray-700 animate-pulse rounded"></div>
                                    </span>
                                    <div className="flex flex-1 flex-wrap gap-1">
                                        {Array(4).fill(0).map(
                                            (_, index) => (
                                                <div key={index} className="animate-pulse h-[18px] w-12 rounded-md bg-gray-700"></div>
                                            ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-x-5 py-2">
                                    <span className="w-48 ">
                                        <div className="w-14 h-[24px] bg-gray-700 animate-pulse rounded"></div>
                                    </span>
                                    <div className="flex flex-1 flex-wrap gap-1">
                                        {Array(3).fill(0).map((_, index) => (
                                            <div key={index} className="animate-pulse h-[18px] w-12 rounded-md bg-gray-700"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden w-[300px] xl:flex flex-col  gap-y-8">
                        <div className="mt-8 hidden  lg:block">
                            <div className="w-32 h-[28px] bg-gray-700 animate-pulse rounded"></div>
                            <div className="mt-8 flex flex-col gap-y-5">
                                {Array(3).fill(0).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-x-4"
                                    >
                                        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-gray-700 animate-pulse"></div>
                                        <div className="flex flex-col gap-y-2 ">
                                            <div className="w-32 h-3.5 bg-gray-700 animate-pulse rounded"></div>
                                            <div className="w-20 h-3.5 bg-gray-700 animate-pulse rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
