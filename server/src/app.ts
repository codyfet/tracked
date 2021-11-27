import express, {Application} from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import colors from "colors";
import morgan from "morgan";
import * as path from "path";
import {errorHandler, notFound} from "./middleware/errorMiddleware";
import {IUserDocument} from "./interfaces/User";

/**
 * Фикс для поддержки атрибута token в поле Request.
 * https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
 */
declare global {
    namespace Express {
        interface Request {
            token: string; // TODO: Убрать.
            user: IUserDocument;
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            PORT?: string;
            MONGO_URI: string;
            JWT_SECRET: string;
            SESSION_EXPIRES_IN: string;
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

app.use("/api/record", require("./routes/record.routes"));
app.use("/api/stat", require("./routes/stat.routes"));
app.use("/api/user", require("./routes/user.routes"));

if (process.env.NODE_ENV === "production") {
    const staticPath = path.resolve(__dirname, "..", "..", "..", "..", "client", "dist");

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
