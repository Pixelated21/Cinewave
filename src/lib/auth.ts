import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { getServerSession, type NextAuthOptions } from "next-auth";

const GITHUB_ID = process.env["GITHUB_ID"];
const GITHUB_SECRET = process.env["GITHUB_SECRET"];
const GOOGLE_ID = process.env["GOOGLE_ID"];
const GOOGLE_SECRET = process.env["GOOGLE_SECRET"];
const NEXTAUTH_SECRET = process.env["NEXTAUTH_SECRET"];

if (!GITHUB_ID) throw new Error("GITHUB_ID is missing from env variables");
if (!GITHUB_SECRET)
	throw new Error("GITHUB_SECRET is missing from env variables");
if (!GOOGLE_ID) throw new Error("GOOGLE_ID is missing from env variables");
if (!GOOGLE_SECRET)
	throw new Error("GOOGLE_SECRET is missing from env variables");
if (!NEXTAUTH_SECRET)
	throw new Error("NEXTAUTH_SECRET is missing from env variables");

export const authOptions: NextAuthOptions = {
	secret: NEXTAUTH_SECRET,
	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) {
				session.user.id = token.sub!;
			}
			return session;
		},
		signIn({ user, account, profile, email, credentials }) {
			console.log("signIn", {
				user,
				account,
				profile,
				email,
				credentials,
			});
			return true;
		},
	},
	adapter: DrizzleAdapter(db),
	session: {
		strategy: "jwt",
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "********",
				},
			},
			// @ts-expect-error
			async authorize(credentials) {
				const user = { id: 42, name: "test", password: "test" };
				if (
					credentials?.username === user.name &&
					credentials?.password === user.password
				) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	pages: {
		newUser: "/profile",
	},
};

export const getAuthSession = () => getServerSession(authOptions);
