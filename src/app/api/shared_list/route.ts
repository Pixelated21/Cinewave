import {
	createSharedListAction,
	findSharedListAction,
} from "@/app/_actions/shared_list";
import { findSharedResourceAction } from "@/app/_actions/shared_resource";
import { getCurrentUserAction } from "@/app/_actions/user";

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUserAction("db");

		if (!currentUser || !currentUser.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		const json = await req.json();

		const { title, shared_list_id } = json;

		// TODO: Check is use already have a link with the same title
		const alreadyInSharedResource = await findSharedListAction(
			shared_list_id,
			currentUser.id
		);

		if (alreadyInSharedResource) {
			return new Response("Already in resources", { status: 409 });
		}

		const createSharedList = await createSharedListAction(
			title,
			currentUser.id
		);

		if (!createSharedList) {
			return new Response("Something went wrong", { status: 500 });
		}

		return new Response("Shared list created", { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Something went wrong", { status: 500 });
	}
}
