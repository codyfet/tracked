"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Модель Пользователь.
 */
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    favouriteMovies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "FavouriteMovie" }],
    records: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Record" }],
    isAdmin: { type: Boolean, required: true, default: false },
    image: { type: String },
}, {
    timestamps: true,
    /**
     * Удаляем records из ответа.
     */
    toJSON: {
        transform: function (doc, ret) {
            delete ret.records;
        },
    },
});
/**
 * Добавляем виртуальное поле years (которого нет в БД).
 */
userSchema.virtual("years").get(function () {
    const years = this.records.map((record) => record.viewdate.getFullYear());
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
exports.default = (0, mongoose_1.model)("User", userSchema);
