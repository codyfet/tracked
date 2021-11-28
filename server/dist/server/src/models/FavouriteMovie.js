"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Модель Любимый фильм.
 */
const favouriteMovieSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    release_date: { type: String },
    poster_path: { type: String },
    position: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("FavouriteMovie", favouriteMovieSchema);
