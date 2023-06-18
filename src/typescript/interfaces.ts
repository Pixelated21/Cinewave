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

export interface MovieDetails {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface MovieCredits {
    id: number
    cast: Cast[]
    crew: Crew[]
}

export interface Cast {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface Crew {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    credit_id: string
    department: string
    job: string
}

export interface MovieVideoRequest {
    id: number
    results: MovieVideo[]
}

export interface MovieVideo {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}



export interface Trending extends Movie {
    media_type: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Rating {
    value: number;
    name: string;
}

export interface Language {
    iso_639_1: string;
    english_name: string;
    name: string;
}

export interface NavLink {
    title: string,
    href: string,
    is_auth?: boolean
}

export interface DiscoverMovieAdvancedFilters {
    certification?: string,
    certification_gte?: string,
    certification_lte?: string,
    certification_country?: string,
    include_adult?: boolean,
    include_video?: boolean,
    language?: string,
    page?: number,
    primary_release_year?: number,
    primary_release_date_gte?: string,
    primary_release_date_lte?: string,
    region?: string,
    release_date_gte?: string,
    release_date_lte?: string,
    sort_by?: string,
    vote_average_gte?: number,
    vote_average_lte?: number,
    vote_count_gte?: number,
    vote_count_lte?: number,
    watch_region?: string,
    with_cast?: string,
    with_companies?: string,
    with_crew?: string,
    with_genres?: string,
    with_keywords?: string,
    with_origin_country?: string,
    with_origin_language?: string,
    with_people?: string,
    with_release_type?: number,
    with_runtime_gte?: number,
    with_runtime_lte?: number,
    with_watch_monetization_types?: string,
    with_watch_providers?: string,
    without_companies?: string,
    without_genres?: string,
    without_keywords?: string,
    without_watch_providers?: string
}
