import { findSharedListAction } from "@/app/_actions/shared_list";
import BookmarkCard from "@/components/cards/BookmarkCard";
import LayoutSection from "@/components/layouts/LayoutSection";
import { notFound } from "next/navigation";

export default async function SharedSpacePage({ params }: { params: { linkId: string } }) {
    const { linkId } = params;
    const getSharedList = findSharedListAction(linkId);

    const [sharedList] = await Promise.all([
        getSharedList
    ]);

    if (!sharedList) {
        return notFound();
    }

    const resources = sharedList.shared_resources.map(item => item.resource);

    return (
        <main className="h-screen overflow-y-scroll bg-[#18181B]">
            <h1 className="mb-10 text-3xl font-semibold">{sharedList.title}</h1>

            <LayoutSection>
                {resources.map((resource) => (
                    <BookmarkCard key={resource.id} resource={resource} />
                ))}
            </LayoutSection>
        </main>
    )
}