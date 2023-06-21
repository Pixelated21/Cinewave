import NavigationBar from "@/components/NavigationBar";
import MovieGridLayout from "@/components/layouts/MovieGridLayout";
import { Button } from "@/components/ui/button";

export default function ShareSpacePage() {
    return (
        <main className="h-screen overflow-y-auto bg-[#18181B]">
            <NavigationBar className="primary" />
            <section className="overflow-hidden">
                <div className="relative mx-auto max-w-7xl px-4 py-[64px] sm:px-8 xl:px-2"></div>
            </section>
        </main>
    );
}
