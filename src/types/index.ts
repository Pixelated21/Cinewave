export type LanguageTransTypes = "iso_639_1" | "english_name" | "name";

export enum ResourceTypesEnum {
    MOVIE = "movie",
    SERIES = "series",
    COLLECTION = "collection",
    PEOPLE = "people",
}

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

export type MovieDetails = {
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

export type BelongsToCollection = {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export type ProductionCompany = {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export type ProductionCountry = {
    iso_3166_1: string
    name: string
}

export type SpokenLanguage = {
    english_name: string
    iso_639_1: string
    name: string
}

export type Credits = {
    id: number
    cast: Cast[]
    crew: Crew[]
}

export type Cast = {
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

export type Crew = {
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

export type MovieVideoRequest = {
    id: number
    results: MovieVideo[]
}

export type MovieVideo = {
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

export type Series = {
    backdrop_path?: string
    first_air_date: string
    genre_ids: Genre[]
    id: number
    name: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}

export type SeriesDetails = {
    adult: boolean
    backdrop_path: string
    created_by: CreatedBy[]
    episode_run_time: number[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: LastEpisodeToAir
    name: string
    next_episode_to_air: any
    networks: Network[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    seasons: Season[]
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
}

export type CreatedBy = {
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path?: string
}

export type LastEpisodeToAir = {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
}

export type Network = {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export type Season = {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
}

export type Collection = {
    id: number
    name: string
    overview: string
    poster_path: string
    backdrop_path: string
    parts: Part[]
}

export type Part = {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface Trending extends Movie {
    media_type: string;
}

export type Genre = {
    id: number;
    name: string;
}

export type Rating = {
    value: number;
    name: string;
}

export type Language = {
    iso_639_1: string;
    english_name: string;
    name: string;
}

export type NavLink = {
    isDisabled?: boolean;
    title: string,
    href: string,
    is_visible?: boolean,
    is_auth?: boolean
}

export type DiscoverMovieAdvancedFilters = {
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
