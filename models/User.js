const {Schema, model} = require("mongoose");

/**
 * Модель Любимый фильм.
 */
const FavouriteMovie = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    release_date: {type: String},
    poster_path: {type: String},
});

/**
 * Модель Пользователь.
 */
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    favouriteMovies: [FavouriteMovie]
});

module.exports = model("User", schema);