'use client'
import { Button } from "../ui/button";

export default function AddSharedResource() {

    const handleCreateSharedResource = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/shared_resource`, {
                method: 'POST',
                body: JSON.stringify({
                    resource_id: 87739,
                    shared_list_id: 4
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <Button onClick={() => handleCreateSharedResource()}>Add Resource</Button>
        </div>
    )
}