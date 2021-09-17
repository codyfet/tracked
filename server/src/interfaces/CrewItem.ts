import mongoose = require("mongoose");

export interface ICrewItem {
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;
    // id: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

/**
 * Модель, обогащенная mongoose функциональностями.
 */
export interface ICrewItewDocument extends ICrewItem, mongoose.Document {}
