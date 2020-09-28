const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({extended: true, limit: '50mb'}));
app.use(express.static('client/dist'));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/record", require("./routes/record.routes"));
app.use("/api/stat", require("./routes/stat.routes"));

const PORT = config.get("port") || 5000;

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connection to db succeeded.");
        app.listen(PORT, () => console.log(`App started on ${PORT}.`));
    } catch (error) {
        console.log("Server error", error.message);
        process.exit(1);
    }
}

start();


