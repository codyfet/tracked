/**
 * Взято отсюда https://github.com/ravi7mech/tmdbapi_types/blob/master/src/lib/tmdbapi.models.ts
 */

/* CONFIGURATION - API */
export interface ConfigAPI {
    images: Images;
    change_keys: string[];
}

export interface Images {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
}

/* CONFIGURATION - COUNTRIES */
export interface ConfigCountries {
    iso_3166_1: string;
    english_name: string;
}

/* CONFIGURATION - LANGUAGES */
export interface ConfigLanguages {
    iso_639_1: string;
    english_name: string;
    name: string;
}

/**
 * Модель фильма из сервиса "Поиск фильма".
 */
export interface ResultMovie {
    adult: boolean; // false
    backdrop_path: string; // "/kyuvnGGlcnfwE3bbMrBkszzrJGb.jpg"
    genre_ids: number[]; // [16, 12, 35, 10751]
    id: number; // 518755
    original_language: OriginalLanguage; // "ru"
    original_title: string; // "Волки и овцы: Ход свиньёй"
    overview: string; // "В спокойной и размеренной жизни объединённого городка волков и овец появляются неожиданные гости — песец и маленькая овечка. Никто не ожидал, что они принесут с собой смертельную опасность, преодолеть которую можно лишь всем вместе. Ведь только сообща решаются большие проблемы и серьёзные задачи — в единстве сила!"
    popularity: number; // 20.668
    poster_path: string; // "/kkrBQjrA35wXxUk6WKdiJorWR5a.jpg"
    release_date: string; // "2019-01-24"
    title: string; // "Волки и овцы: Ход свиньёй"
    video: boolean; // false
    vote_average: number; // 7
    vote_count: number; // 56
}

/**
 * Модель сериала из сервиса "Поиск сериала".
 */
export interface ResultTVSeries {
    backdrop_path: string; // "/s56eyXy8rADp5DpZknfe2HXq4u4.jpg"
    first_air_date: string; // "2019-12-20"
    genre_ids: number[]; // [10765, 18, 10759]
    id: number; // 71912
    name: string; // "Ведьмак"
    origin_country: string[]; // ["US"]
    original_language: OriginalLanguage; // "en"
    original_name: string; // "The Witcher"
    overview: string; // "Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти - хоть от чудищ болотных, оборотней и даже заколдованных принцесс. В сельской глуши местную девушку Йеннифэр, которой сильно не повезло с внешностью, зато посчастливилось иметь способности к магии, отец продаёт колдунье в ученицы. А малолетняя наследница королевства Цинтра по имени Цири вынуждена пуститься в бега, когда их страну захватывает империя Нильфгаард. Судьбы этих троих окажутся тесно связаны, но скоро сказка сказывается, да не скоро дело делается."
    popularity: number; // 121.901
    poster_path: string; // "/3MlspZT8LgKImnYDS11cLxdbxnK.jpg"
    vote_average: number; // 8.1
    vote_count: number; // 2399
}

/**
 * Детали Фильма.
 */
export interface TVMovieDetailsItem {
    adult: boolean; // false
    backdrop_path: string; // "/xKb6mtdfI5Qsggc44Hr9CCUDvaj.jpg"
    belongs_to_collection: Collection;
    budget: number; // 102000000
    genres: Genre[];
    homepage: string; // "https://www.lionsgate.com/movies/terminator-2-judgment-day"
    id: number; // 280
    imdb_id: string; // "tt0103064"
    original_language: OriginalLanguage;
    original_title: string; // "Terminator 2: Judgment Day"
    overview: string; // "Война роботов и людей продолжается. Казалось, что человечество обречено на полное уничтожение. Но благодаря своему лидеру Джону Коннору у сопротивления появляется шанс победить. Не имея возможности убить Джона в реальном времени, роботы отправляют в прошлое свою самую совершенную разработку — терминатора-убийцу из жидкого металла, способного принимать любое обличье."
    popularity: number; //  41.601
    poster_path: string; // "/67MopMcqqke4sJmcOwY5zu3kmYz.jpg"
    production_companies: Company[]; // [{id: 275, logo_path: "/2MxNWlN5b3UXt1OfmznsWEQzFwq.png", name: "Carolco Pictures",…},…]
    production_countries: ConfigCountries[]; // [{iso_3166_1: "FR", name: "France"}, {iso_3166_1: "US", name: "United States of America"}]
    release_date: string; // "1991-07-03"
    revenue: number; // 520000000
    runtime: number; // 137
    spoken_languages: ConfigLanguages[]; // [{english_name: "English", iso_639_1: "en", name: "English"},…]
    status: string; // "Released"
    tagline: string; // "То же железо, та же модель, новая миссия"
    title: string; // "Терминатор 2: Судный день"
    video: boolean; // false
    vote_average: number; // 8
    vote_count: number; // 9590
}

/**
 * Детали Сериала.
 */
export interface TVSeriesDetailsItem {
    backdrop_path: string; // "/suopoADq0k8YZr4dQXcU6pToj6s.jpg"
    created_by: Credit[];
    episode_run_time: number[]; // [60]
    first_air_date: string; // "2011-04-17"
    genres: Genre[];
    homepage: string; // "http://www.hbo.com/game-of-thrones"
    id: number; // 1399
    in_production: false;
    languages: ["en"];
    last_air_date: "2019-05-19";
    last_episode_to_air: EpisodeData;
    name: string; // "Игра Престолов"
    networks: Company;
    next_episode_to_air: EpisodeData;
    number_of_episodes: number; // 73
    number_of_seasons: number; // 8
    origin_country: string[]; //  ["US"]
    original_language: OriginalLanguage; // "en"
    original_name: string; // "Game of Thrones"
    overview: string; // "К концу подходит время благоденствия, и лето, длившееся почти десятилетие, угасает. Вокруг средоточия власти Семи Королевств, Железного трона, зреет заговор, и в это непростое время король решает искать поддержки у друга юности Эддарда Старка. В мире, где все — от короля до наёмника — рвутся к власти, плетут интриги и готовы вонзить нож в спину, есть место и благородству, состраданию и любви. Между тем, никто не замечает пробуждение тьмы из легенд далеко на Севере — и лишь Стена защищает живых к югу от неё."
    popularity: number; // 521.863
    poster_path: string; // "/bHzz0i6Ue7IixhSjFlGs0slzL2m.jpg"
    production_companies: Company[];
    production_countries: ConfigCountries[];
    seasons: Season[];
    spoken_languages: ConfigLanguages[];
    status: string; // "Ended";
    tagline: string; //  "Зима близко";
    type: string; // "Scripted";
    vote_average: number; // 8.4;
    vote_count: number; //15436;
}

export enum OriginalLanguage {
    En = "en",
    Ru = "ru",
}

// GET GENRES
export interface Genres {
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface Credit {
    credit_id: string; // "5256c8c219c2956ff604858a"
    gender: number; // 2
    id: number; // 9813
    name: string; // "David Benioff"
    profile_path: string; // "/xvNN5huL0X8yJ7h3IZfGG4O2zBD.jpg"
}

export interface EpisodeData {
    air_date: number; // "2019-05-19"
    episode_number: number; // 6
    id: number; // 1551830
    name: string; // "Железный Трон"
    overview: string; // "Будет поставлена точка в истории Семи Королевств. Утих бой колоколов в драконьем пламени. Красный замок пал перед Кровавой королевой, обрушившись на голову Серсеи и её брата. Дейнерис победила, но какой ценой? Её верные воины приветствуют свою Кхалисси, но мирный народ Королевской гавани беспощадно был сожжен. Город пылает, повсюду пепел и страх…"
    production_code: string; // "806"
    season_number: number; // 8
    still_path: string; // "/3x8tJon5jXFa1ziAM93hPKNyW7i.jpg"
    vote_average: number; // 4.811
    vote_count: number; // 143
}

/**
 *  Компания. Используется для network и production_companies.
 */
export interface Company {
    id: number; // 49
    logo_path: string; // "/tuomPhY2UtuPTqqFnKMVHvSb724.png"
    name: string; // "HBO"
    origin_country: string; // "US"
}

export interface Season {
    air_date: string; // "2010-12-05"
    episode_count: number; // 176
    id: number; // 3627
    name: string; // "Спецматериалы"
    overview: string; //  ""
    poster_path: string; //  "/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg"
    season_number: number; // 0
}

export interface Collection {
    backdrop_path: string; // "/cpmbkwSxZnKO69V82A9a34tvk2E.jpg"
    id: number; // 528
    name: string; // "Терминатор (Коллекция)"
    poster_path: string; // "/w6Ya0LPeW9flEqY6wcIUtBWQCD0.jpg"
}

export interface MovieCredits {
    cast: CastItem[];
    crew: CrewItem[];
    id: number; // 280
}

export interface CastItem {
    adult: boolean; // false
    cast_id: number; // 1
    character: string; // "The Terminator"
    credit_id: string; // "52fe4231c3a36847f800b283"
    gender: number; // 2
    id: number; // 1100
    known_for_department: string; // "Acting"
    name: string; //"Arnold Schwarzenegger"
    order: number; // 0
    original_name: string; //"Arnold Schwarzenegger"
    popularity: number; // 26.427
    profile_path: string; // "/ndFI7UJWtStgJbgjA5r40ivW0kH.jpg"
}

export interface CrewItem {
    adult: boolean; // false
    credit_id: string; // "56b23ee3c3a36845b7000470"
    department: string; // "Editing"
    gender: number; // 1
    id: number; // 563
    job: string; // "Additional Editing"
    known_for_department: string; //  "Editing"
    name: string; // "Dody Dorn"
    original_name: string; // "Dody Dorn"
    popularity: number; // 1.4
    profile_path: string; // "/d3RESRZlLhsOIUQNIWxVqaO21q3.jpg"
}
