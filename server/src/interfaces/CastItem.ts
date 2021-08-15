import mongoose = require("mongoose");

export interface ICastItem {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    // id: number;
    name: string;
    order: number;
    profile_path: string;
}

/**
 * Модель, обогащенная mongoose функциональностями.
 */
export interface ICastItemModel extends ICastItem, mongoose.Document {}
