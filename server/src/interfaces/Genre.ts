import mongoose = require("mongoose");

export interface IGenre {
    // id: number;
    name: string;
}

/**
 * Модель, обогащенная mongoose функциональностями.
 */
export interface IGenreModel extends IGenre, mongoose.Document {}
