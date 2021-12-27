import {asyncHandler} from "express-async-handler";
import {
    authenticateVkontakte,
    callbackVkontakte,
    vkontakteStrategy,
} from "./config/passport-vkontakte";
import express, {Application} from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import colors from "colors";
import morgan from "morgan";
import * as path from "path";
import {errorHandler, notFound} from "./middleware/errorMiddleware";
import passport from "passport";
import {configure} from "./config/passport";
import {IUserDocument} from "./interfaces/User";

/**
 * Фикс для поддержки атрибута token в поле Request.
 * https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
 */
declare global {
    namespace Express {
        /**
         * Так как passport определяет пустой интерфейс Express.User,
         * то здесь я переопределяю его своей моделью и теперь в Request лежит пользователь с нужной моделью
         * (добавленный passport в функции authenticate).
         */
        interface User extends IUserDocument {}
    }
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            PORT?: string;
            MONGO_URI: string;
            JWT_SECRET: string;
            SESSION_EXPIRES_IN: string;
            VK_CLIENT_ID: string;
            VK_CLIENT_SECRET: string;
        }
    }
}

dotenv.config();

connectDB();

const app: Application = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// app.use(express.json({extended: true, limit: "50mb"}));
app.use(express.json({limit: "50mb"}));

// Конфигурируем passport.
configure(passport);
// Активируем passport.
app.use(passport.initialize());

passport.serializeUser((user: Express.User, cb) => cb(null, user));

passport.deserializeUser((user: Express.User, cb) => cb(null, user));

passport.use(vkontakteStrategy());

app.use("/api/record", require("./routes/record.routes"));
app.use("/api/stat", require("./routes/stat.routes"));
app.use("/api/user", require("./routes/user.routes"));

app.use("/vkontakte", authenticateVkontakte);
app.use(
    "/vkontakte/callback",
    asyncHandler(async function (req: any, res: any, next: any) {
        return passport.authenticate(
            "vkontakte",
            {
                session: false,
                successRedirect: "/",
                failureRedirect: "/login",
            },
            (err, user, info) => {
                if (err) {
                    console.log("В passport.authenticate произошла ошибка", err);
                    return next(err);
                }
                if (!user) {
                    res.status(401);
                    throw new Error("Not authorized, token failed");
                }
                req.user = user;
                next();
            }
        )(req, res, next);
    })
);

if (process.env.NODE_ENV === "production") {
    const staticPath = path.resolve(__dirname, "..", "..", "client", "dist");

    app.use(express.static(staticPath));

    app.get("*", (req, res) => res.sendFile(staticPath + "/index.html"));
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(
        colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`)
    )
);
