import mongoose from 'mongoose';

export const mongoConnect = () => {
    mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true,
                 useUnifiedTopology: true,
                 useCreateIndex: true,
                 useFindAndModify: false },
        (err) => {
            err ? console.error(err)
                : console.info(`Соединение с MongoDB установлено...`);
        },
    );
};