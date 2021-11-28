"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const Record_1 = require("../models/Record");
const consts_1 = require("../consts");
const enums_1 = require("../enums");
const router = express_1.default.Router();
/**
 * Класс для вычисления статистики по фильмам пользовтеля.
 */
class StatCalculator {
    /**
     * Вычисляем статистику по количеству оценок.
     */
    static getMarksData(movies) {
        const marksData = [];
        const markGroupedMovies = lodash_1.default.groupBy(movies, (item) => item.rating);
        for (let i = 1; i < 11; i++) {
            const mark = "" + i;
            marksData.push({
                mark,
                markCount: markGroupedMovies[mark] ? markGroupedMovies[mark].length : 0,
            });
        }
        return marksData;
    }
    /**
     * Вычисляем статистику по жанрам.
     */
    static genresData(movies) {
        const genresData = [];
        const genres = movies.reduce((acc, item) => acc.concat(item.genres), []);
        const genresGrouped = lodash_1.default.groupBy(genres, "name");
        const genresKeys = Object.keys(genresGrouped);
        lodash_1.default.forEach(genresKeys, (genreName) => {
            genresData.push({
                name: genreName,
                value: genresGrouped[genreName].length,
            });
        });
        // Сортируем и забираем только первые 10.
        const genresFilteredResult = genresData.sort((a, b) => b.value - a.value).slice(0, 10);
        // Остальные складываем в "Другое".
        genresFilteredResult.push({
            name: "другое",
            value: genresData
                .slice(10, genresData.length - 1)
                .reduce((acc, item) => item.value + acc, 0),
        });
        return genresFilteredResult;
    }
    /**
     * Вычисляем статистику по странам.
     */
    static getCountriesData(movies) {
        const countriesData = [];
        const countryResult = {};
        const countries = movies.reduce((acc, item) => acc.concat(item.production_countries), []);
        lodash_1.default.forEach(countries, (country) => {
            if (countryResult[country]) {
                countryResult[country] = ++countryResult[country];
            }
            else {
                countryResult[country] = 1;
            }
        });
        const countryKeys = Object.keys(countryResult);
        lodash_1.default.forEach(countryKeys, (key) => {
            countriesData.push({
                country: key,
                countryCount: countryResult[key],
                countryName: consts_1.COUNTRIES_MAP[key.toLowerCase()],
            });
        });
        const countriesFilteredResult = countriesData
            .sort((a, b) => b.countryCount - a.countryCount)
            .slice(0, 10);
        /**
         * Остальные складываем в "Другое".
         */
        countriesFilteredResult.push({
            country: "другое",
            countryCount: countriesData
                .slice(10, countriesData.length - 1)
                .reduce((acc, item) => item.countryCount + acc, 0),
            countryName: "другое",
        });
        return countriesFilteredResult;
    }
    /**
     * Вычисляем статистику по годам.
     */
    static getYearsData(movies) {
        const yearsData = [];
        const yearsGroupedMovies = lodash_1.default.groupBy(movies, "releaseYear");
        for (let i = 1950; i < 2021; i++) {
            const year = i + "";
            yearsData.push({
                year,
                yearCount: yearsGroupedMovies[year] ? yearsGroupedMovies[year].length : 0,
            });
        }
        return yearsData;
    }
    /**
     * Вычисляем статистику по персонам.
     */
    static getDirectorsData(movies) {
        const directorsData = [];
        const directorsResult = {};
        const directors = movies.reduce((acc, movie) => {
            const foundPersons = movie.crew.filter((crewItem) => crewItem.job === "Director");
            return acc.concat(foundPersons.map((p) => p.name));
        }, []);
        lodash_1.default.forEach(directors, (country) => {
            if (directorsResult[country]) {
                directorsResult[country] = ++directorsResult[country];
            }
            else {
                directorsResult[country] = 1;
            }
        });
        const directorsKeys = Object.keys(directorsResult);
        lodash_1.default.forEach(directorsKeys, (key) => {
            directorsData.push({
                director: key,
                directorCount: directorsResult[key],
            });
        });
        const directorsFilteredResult = directorsData
            .sort((a, b) => b.directorCount - a.directorCount)
            .slice(0, 10);
        return directorsFilteredResult;
    }
    /**
     * Вычисляем статистику по актёрам и актрисам.
     */
    static getActorsActressesData(movies) {
        const actorsData = [];
        const actressesData = [];
        const actorsResult = {};
        const actressesResult = {};
        const actors = movies.reduce((acc, movie) => {
            const men = movie.cast.filter((castItem) => castItem.gender === 1);
            return acc.concat(men.map((p) => p.name));
        }, []);
        const actresses = movies.reduce((acc, movie) => {
            const women = movie.cast.filter((castItem) => castItem.gender === 0);
            return acc.concat(women.map((p) => p.name));
        }, []);
        lodash_1.default.forEach(actors, (item) => {
            if (actorsResult[item]) {
                actorsResult[item] = ++actorsResult[item];
            }
            else {
                actorsResult[item] = 1;
            }
        });
        lodash_1.default.forEach(actresses, (item) => {
            if (actressesResult[item]) {
                actressesResult[item] = ++actressesResult[item];
            }
            else {
                actressesResult[item] = 1;
            }
        });
        const actorsKeys = Object.keys(actorsResult);
        const actressesKeys = Object.keys(actressesResult);
        lodash_1.default.forEach(actorsKeys, (key) => {
            actorsData.push({
                actor: key,
                actorCount: actorsResult[key],
            });
        });
        lodash_1.default.forEach(actressesKeys, (key) => {
            actressesData.push({
                actress: key,
                actressCount: actressesResult[key],
            });
        });
        const actorsFilteredResult = actorsData
            .sort((a, b) => b.actorCount - a.actorCount)
            .slice(0, 10);
        const actressesFilteredResult = actressesData
            .sort((a, b) => b.actressCount - a.actressCount)
            .slice(0, 10);
        return {
            actorsData: actorsFilteredResult,
            actressesData: actressesFilteredResult,
        };
    }
    /**
     * Возвращает количество просмотренных фильмов в текущем году.
     */
    static getRecordsCurrentYearCount(records) {
        const [moviesRecords, tvseriesRecords] = lodash_1.default.partition(records, (record) => record.type === enums_1.ERecordType.MOVIE);
        const groupedMoviesByYears = lodash_1.default.groupBy(moviesRecords, (record) => new Date(record.viewdate).getFullYear());
        const groupedTvseriesByYears = lodash_1.default.groupBy(tvseriesRecords, (record) => new Date(record.viewdate).getFullYear());
        const currentYear = new Date().getFullYear();
        const movies = groupedMoviesByYears[currentYear]
            ? groupedMoviesByYears[currentYear].length
            : 0;
        const tvseries = groupedTvseriesByYears[currentYear]
            ? groupedTvseriesByYears[currentYear].length
            : 0;
        return {
            movies,
            tvseries,
        };
    }
    /**
     * Возвращает количество просмотренных фильмов за все года.
     */
    static getRecordsTotalCount(records) {
        const [moviesRecords, tvseriesRecords] = lodash_1.default.partition(records, (record) => record.type === enums_1.ERecordType.MOVIE);
        return {
            movies: moviesRecords.length,
            tvseries: tvseriesRecords.length,
        };
    }
}
// /api/stat
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            userId: req.query.userId,
        };
        /**
         * Если пользователь выбрал "За все года", то фильтр по году не добавляем.
         */
        if (req.query.year !== "0") {
            filter.viewdate = {
                $gte: new Date(req.query.year ? +req.query.year : 0, 0, 1),
                $lt: new Date(req.query.year ? +req.query.year : 0, 11, 31),
            };
        }
        const records = yield Record_1.RecordModel.find(filter).exec();
        const movies = lodash_1.default.filter(records, (item) => item.type === enums_1.ERecordType.MOVIE);
        const actStat = StatCalculator.getActorsActressesData(movies);
        /**
         * Отправляем клиенту статистику.
         */
        res.status(201).json({
            marksData: StatCalculator.getMarksData(movies),
            genresData: StatCalculator.genresData(movies),
            countriesData: StatCalculator.getCountriesData(movies),
            yearsData: StatCalculator.getYearsData(movies),
            directorsData: StatCalculator.getDirectorsData(movies),
            actorsData: actStat.actorsData,
            actressesData: actStat.actressesData,
            recordsCurrentYearCount: StatCalculator.getRecordsCurrentYearCount(records),
            recordsTotalCount: StatCalculator.getRecordsTotalCount(records),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
    }
}));
module.exports = router;
