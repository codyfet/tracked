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
const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    favouriteMovies: [FavouriteMovie],
    records : [{type: Schema.Types.ObjectId, ref: 'Record'}]
});

/**
 * Добавляем виртуальное поле years (которого нет в БД).
 */
userSchema.virtual('years').get(function() {
    return this.records.map((record) => record.viewdate.getFullYear());
});

/**
 * Добавляем виртуальные поля в ответ.
 */
userSchema.set('toJSON', {
    virtuals: true
});

/**
 * Удаляем records из ответа.
 */
userSchema.options.toJSON.transform = function (doc, ret, options) {
    delete ret.records;
};

module.exports = model("User", userSchema);