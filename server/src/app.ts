import express, {Application} from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import colors from "colors";

/**
 * Фикс для поддержки атрибута token в поле Request.
 * https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
 */
declare global {
    namespace Express {
        interface Request {
            token: string;
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

// app.use(express.json({extended: true, limit: "50mb"}));
app.use(express.json({limit: "50mb"}));
app.use(express.static("client/dist"));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/record", require("./routes/record.routes"));
app.use("/api/stat", require("./routes/stat.routes"));
app.use("/api/users", require("./routes/users.routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(
        colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`)
    )
);
