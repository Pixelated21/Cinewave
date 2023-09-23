declare namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_THE_MOVIE_DATABASE_API_URL: string;
		readonly NEXT_PUBLIC_THE_MOVIE_DATABASE_IMAGE_URL: string;
		readonly NEXT_PUBLIC_NEXT_API_URL: string;
		readonly NEXT_PUBLIC_NEXT_APP_URL: string;
		readonly THE_MOVIE_DATABASE_API_KEY: string;
		readonly DB_CONNECTION: string;
		readonly DB_HOST: string;
		readonly DB_PORT: number;
		readonly DB_DATABASE: string;
		readonly DB_USERNAME: string;
		readonly DB_PASSWORD: string;
		readonly POSTGRES_URL: string;
		readonly GITHUB_ID: string;
		readonly GITHUB_SECRET: string;
		readonly GOOGLE_ID: string;
		readonly GOOGLE_SECRET: string;
	}
}
