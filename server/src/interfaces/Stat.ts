export interface IMarksDataItem {
    mark: string;
    markCount: number;
}

export interface IGenresDataItem {
    name: string;
    value: number;
}

export interface ICountryDataItem {
    country: string;
    countryCount: number;
    countryName: string;
}

export interface IYearsDataItem {
    year: string;
    yearCount: number;
}

export interface IDirectorsDataItem {
    director: string;
    directorCount: number;
}

export interface IActorsDataItem {
    actor: string;
    actorCount: number;
}

export interface IActressesDataItem {
    actress: string;
    actressCount: number;
}

export interface IActorsActressesData {
    actorsData: IActorsDataItem[];
    actressesData: IActressesDataItem[];
}

export interface IRecordsCurrentYearCount {
    movies: number;
    tvseries: number;
}

export interface IRecordsTotalCount {
    movies: number;
    tvseries: number;
}

export interface IStat {
    marksData: IMarksDataItem[];
    genresData: IGenresDataItem[];
    countriesData: ICountryDataItem[];
    yearsData: IYearsDataItem[];
    directorsData: IDirectorsDataItem[];
    actorsData: IActorsDataItem[];
    actressesData: IActressesDataItem[];
    recordsCurrentYearCount: IRecordsCurrentYearCount;
    recordsTotalCount: IRecordsTotalCount;
}
