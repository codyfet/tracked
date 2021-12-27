import {IUser, IUserDocument} from "../interfaces/User";
import {Schema, model} from "mongoose";
import {IRecord} from "../interfaces/Record";
import bcrypt from "bcryptjs";

/**
 * Модель Пользователь.
 */
const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        username: {type: String, required: true},
        favouriteMovies: [{type: Schema.Types.ObjectId, ref: "FavouriteMovie"}],
        records: [{type: Schema.Types.ObjectId, ref: "Record"}],
        isAdmin: {type: Boolean, required: true, default: false},
        image: {type: String},
        place: {type: String},
        vkId: {type: Number},
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
    const uniqueYears = [...Array.from(new Set(years))];
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

/**
 * Хэширует пароль перед сохранением его в БД.
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default model<IUserDocument>("User", userSchema);
