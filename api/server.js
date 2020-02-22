const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const sessionStore = require('connect-session-knex')(session);

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionOptions = {
    name: 'Lebowski',
    secret: 'youreoutofyourelementdonny',
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new sessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
};

server.use(session(sessionOptions));

server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
