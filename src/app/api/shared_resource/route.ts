import {
	createSharedResourceAction,
	findSharedResourceAction,
} from "@/app/_actions/shared_resource";
import { getCurrentUserAction } from "@/app/_actions/user";

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUserAction("db");

		if (!currentUser || !currentUser.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		const json = await req.json();

		const { shared_list_id, resource_id } = json;

		const alreadyInSharedResource = await findSharedResourceAction(
			shared_list_id,
			resource_id
		);

		if (alreadyInSharedResource) {
			return new Response("Already in watchlist", { status: 409 });
		}

		const createSharedResource = await createSharedResourceAction({
			resource_id: resource_id,
			shared_list_id: shared_list_id,
		});

		if (!createSharedResource) {
			return new Response("Something went wrong", { status: 500 });
		}

		return new Response("Shared list created", { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Something went wrong", { status: 500 });
	}
}
