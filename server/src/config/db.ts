import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        // Список опций можно посмотреть тут https://www.youtube.com/watch?v=lNqaQ0wEeAo
        // + Хороший пример работы с конфигом
        console.log(colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));
    } catch (error: any) {
        console.error(colors.red.underline.bold(`Error: ${error.message}`));
        process.exit(1);
    }
};

export default connectDB;
