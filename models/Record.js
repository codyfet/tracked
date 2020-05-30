const {Schema, model} = require("mongoose");

/**
 * Модель участника Cast.
 */
const CastItem = new Schema({
    cast_id: {type: Number},
    character: {type: String},
    credit_id: {type: String},
    gender: {type: Number},
    id: {type: Number},
    name: {type: String},
    order: {type: Number},
    profile_path: {type: String}
});

/**
 * Модель участника Crew.
 */
const CrewItem = new Schema({
    credit_id: {type: String},
    department: {type: String},
    gender: {type: Number},
    id: {type: Number},
    job: {type: String},
    name: {type: String},
    profile_path: {type: String},
});

/**
 * Модель Жанр.
 */
const Genre = new Schema({
    id: {type: Number},
    name: {type: String},
});


/**
 * Модель Запись (Фильм/Сериал).
 */
const Record = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    id: {type: Number, required: true},
    viewdate: {type: Date},
    posterpath: {type: String},
    title: {type: String, required: true},
    releaseYear: {type: String, required: true},
    originalTitle: {type: String},
    rating: {type: String},
    type: {type: String, required: true},
    backdrop_path: {type: String},
    genres: [Genre],
    overview: {type: String},
    production_countries: [String],
    director: [String],
    reViewed: {type: Boolean},
    notFinished: {type: Boolean},
    cast: [CastItem],
    crew: [CrewItem],

    season: {type: String},
    inProduction: {type: Boolean},
    numberOfSeasons: {type: Number}
});

module.exports = model("Record", Record);