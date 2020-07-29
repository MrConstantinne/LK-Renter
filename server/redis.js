import connectRedis from 'connect-redis';
import session from 'express-session';
import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

export const sessionOptions = {
    store: new RedisStore({ client: redisClient }),
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: parseInt(process.env.SESSION_LIFITIME),
        httpOnly: false,
        sameSite: true,
        proxy: true
        // TODO: secure: IN_PROD  для https
    },
};

export const redisConnect = () => {
    redisClient
        .on('connect', () => console.info('Соединение с Redis установлено...'))
        .on('close', () => console.info('Соединение с Redis потеряно...'))
};