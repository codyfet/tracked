import {IUser, IUserModel} from "../interfaces/User";
import {Schema, model} from "mongoose";
import {IRecord} from "../interfaces/Record";

/**
 * Модель Любимый фильм.
 */
const FavouriteMovieSchema: Schema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    release_date: {type: String},
    poster_path: {type: String},
});

/**
 * Модель Пользователь.
 */
const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        username: {type: String, required: true},
        favouriteMovies: [FavouriteMovieSchema],
        records: [{type: Schema.Types.ObjectId, ref: "Record"}],
        isAdmin: {type: Boolean, required: true, default: false},
    },
    {
        timestamps: true,
        /**
         * Удаляем records из ответа.
         */
        toJSON: {
            transform: function (doc, ret) {
                delete ret.records;
            },
        },
    }
);

/**
 * Добавляем виртуальное поле years (которого нет в БД).
 */
userSchema.virtual("years").get(function (this: IUser) {
    const years = this.records.map((record: IRecord) => record.viewdate.getFullYear());
    const uniqueYears = [...new Set(years)];
    return uniqueYears;
});

/**
 * Добавляем виртуальные поля в ответ.
 *
 * Отключено за ненадобностью. При необходимости перевести в true.
 */
userSchema.set("toJSON", {
    virtuals: false,
});

export default model<IUserModel>("User", userSchema);
