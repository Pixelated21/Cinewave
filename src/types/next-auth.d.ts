import type { JWT } from "next-auth/jwt";
import type { DefaultUser, Session, User } from "next-auth";

declare module "next-auth" {
	interface Session {
		user?: DefaultUser & {
			id: string;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: UserId;
	}
}
