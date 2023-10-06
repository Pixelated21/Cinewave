import { NextResponse } from "next/server";

export async function GET() {
	try {
		console.log(`Cron Ran`);
		return NextResponse.json(
			{ message: `The Cron Has Ran` },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Failed running the cron");
		return NextResponse.json(
			{ error: "Failed running the cron" },
			{ status: 500 }
		);
	}
}
