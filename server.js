const config = require('config');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('./config/db');

const app = express();

require("./authenticate")

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ 
        mongoUrl: `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`
    }),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: eval(config.db.maxAge)
    }
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const PORT = config.PORT || 3001;

app.use("/users", require("./routes/user.router.js"));
app.use("/", require('./routes/home.router.js'));

app.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}/`);
})