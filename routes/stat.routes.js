const {Router} = require("express");
const _ = require("lodash");
const Record = require("../models/Record");
const {COUNTRIES_MAP} = require("../consts");

const router = new Router();

/**
 * Класс для вычисления статистики по фильмам пользовтеля.
 */
class StatCalculator {
    /**
     * Вычисляем статистику по количеству оценок.
     */
    static getMarksData(movies) {
        const marksData = [];
        const markGroupedMovies = _.groupBy(movies, (item) => item.rating);

        for (let i = 1; i < 11; i++) {
            const mark = "" + i;

            marksData.push({
                mark,
                markCount: markGroupedMovies[mark] ? markGroupedMovies[mark].length : 0
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
        const genresGrouped = _.groupBy(genres, "name");
        const genresKeys = Object.keys(genresGrouped);

        _.forEach(genresKeys, (genreName) => {
            genresData.push({
                name: genreName,
                value: genresGrouped[genreName].length
            });
        });
        // Сортируем и забираем только первые 10.
        const genresFilteredResult = genresData.sort((a, b) => b.value - a.value).slice(0, 10);
        // Остальные складываем в "Другое".
        genresFilteredResult.push({
            name: "другое",
            value: genresData.slice(10, (genresData.length - 1)).reduce((acc, item) => item.value + acc, 0)
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

        _.forEach(countries, (country) => {
            if (countryResult[country]) {
                countryResult[country] = ++countryResult[country];
            } else {
                countryResult[country] = 1;
            }
        });

        const countryKeys = Object.keys(countryResult);

        _.forEach(countryKeys, (key) => {
            countriesData.push({
                country: key,
                countryCount: countryResult[key],
                countryName: COUNTRIES_MAP[key.toLowerCase()]
            });
        });

        const countriesFilteredResult = countriesData.sort((a, b) => b.countryCount - a.countryCount).slice(0, 10);

        /**
         * Остальные складываем в "Другое".
         */
        countriesFilteredResult.push({
            country: "другое",
            countryCount: countriesData.slice(10, (countriesData.length - 1)).reduce((acc, item) => item.countryCount + acc, 0),
            countryName: "другое"
        });

        return countriesFilteredResult;
    }

    /**
     * Вычисляем статистику по годам.
     */
    static getYearsData(movies) {
        const yearsData = [];
        const yearsGroupedMovies = _.groupBy(movies, "releaseYear");

        for (let i = 1950; i < 2021; i++) {
            const year = i + "";

            yearsData.push({
                year,
                yearCount: yearsGroupedMovies[year] ? yearsGroupedMovies[year].length : 0
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

        _.forEach(directors, (country) => {
            if (directorsResult[country]) {
                directorsResult[country] = ++directorsResult[country];
            } else {
                directorsResult[country] = 1;
            }
        });

        const directorsKeys = Object.keys(directorsResult);

        _.forEach(directorsKeys, (key) => {
            directorsData.push({
                director: key,
                directorCount: directorsResult[key]
            });
        });

        const directorsFilteredResult = directorsData.sort((a, b) => b.directorCount - a.directorCount).slice(0, 10);

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

        _.forEach(actors, (item) => {
            if (actorsResult[item]) {
                actorsResult[item] = ++actorsResult[item];
            } else {
                actorsResult[item] = 1;
            }
        });

        _.forEach(actresses, (item) => {
            if (actressesResult[item]) {
                actressesResult[item] = ++actressesResult[item];
            } else {
                actressesResult[item] = 1;
            }
        });

        const actorsKeys = Object.keys(actorsResult);
        const actressesKeys = Object.keys(actressesResult);

        _.forEach(actorsKeys, (key) => {
            actorsData.push({
                actor: key,
                actorCount: actorsResult[key]
            });
        });

        _.forEach(actressesKeys, (key) => {
            actressesData.push({
                actress: key,
                actressCount: actressesResult[key]
            });
        });

        const actorsFilteredResult = actorsData.sort((a, b) => b.actorCount - a.actorCount).slice(0, 10);;
        const actressesFilteredResult = actressesData.sort((a, b) => b.actressCount - a.actressCount).slice(0, 10);

        return {
            actorsData: actorsFilteredResult,
            actressesData: actressesFilteredResult
        }
    }

    /**
     * Возвращает количество просмотренных фильмов в текущем году.
     */
    static getRecordsCurrentYearCount(records) {
        const groupedRecordsByYears = _.groupBy(records, (r) => new Date(r.viewdate).getFullYear());
        const currentYear = new Date().getFullYear();
        const recordsCurrentYearCount = groupedRecordsByYears[currentYear] ? groupedRecordsByYears[currentYear].length : 0;

        return recordsCurrentYearCount;
    }

    /**
     * Возвращает количество просмотренных фильмов за все года.
     */
    static getRecordsTotalCount(records) {
        return records.length;
    }
}

// /api/stat
router.get(
    "/",
    async (req, res) => {
        try {
            const filter = {
                userId: req.query.userId,
            }

            /**
             * Если пользователь выбрал "За все года", то фильтр по году не добавляем.
             */
            if (req.query.year !== "0") {
                filter.viewdate = {"$gte": new Date(req.query.year, 0, 1), "$lt": new Date(req.query.year, 11, 31)}
            }

            const records = await Record.find(filter).exec();
            const movies = _.filter(records, (item) => item.type === "movie");
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
                recordsTotalCount: StatCalculator.getRecordsTotalCount(records)
            });
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
);

module.exports = router;