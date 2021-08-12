import express, {Application} from "express";
import config from "config";
import mongoose from "mongoose";

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
}

const app: Application = express();

// app.use(express.json({extended: true, limit: "50mb"}));
app.use(express.json({limit: "50mb"}));
app.use(express.static("client/dist"));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/record", require("./routes/record.routes"));
app.use("/api/stat", require("./routes/stat.routes"));
app.use("/api/users", require("./routes/users.routes"));

const PORT = config.get("port") || 5000;

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            // Список опций можно посмотреть тут https://www.youtube.com/watch?v=lNqaQ0wEeAo
            // + Хороший пример работы с конфигом
        });
        console.log("Connection to db succeeded.");
        app.listen(PORT, () => console.log(`App started on ${PORT}.`));
    } catch (error) {
        console.log("Server error", error.message);
        process.exit(1);
    }
}

start();
