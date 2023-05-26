export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids?: (number)[] | null;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Trending extends Movie {
    media_type: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Language {
    iso_639_1: string;
    english_name: string;
    name: string;
}
