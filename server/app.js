const express = require("express")
const mongoose = require("mongoose");
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require('passport')

/*
    Import Routes
*/
const apiRoutes = require('./src/routes/apiRoutes')


// Port number for local and development server
const PORT = process.env.PORT || 8080

/*
    Middleware
*/
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(morgan('combined'))

app.use(session({
    secret: 'zdfvjbhklfdgsfzx',
    resave: true,
    saveUninitialized: true
}));

/* 
    ######################################
    Passport Local Strategy
    ######################################
*/
require("./src/utils/passportHandler")(passport);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());





/*
    ######################################
    Database Connection
    ######################################
*/

// local database
// const connectDB = require("./src/utils/localDbHandler");
// connectDB();

const uri = "mongodb+srv://verzeo:qt6i6NsQyQh2DjB@cluster0.cnowi.mongodb.net/verzeo?retryWrites=true&w=majority";


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(
    () => {
        console.log("Connected to verzeo database")
    }
).catch(error => {
    console.log("Error connecting to verzeo database")
    console.log(error)
})


/*
    ######################################
    CORS
    ######################################
*/
app.use(require("cors")({
    origin: 'http://localhost:3000',
    credentials: true,
}));






/*
    ######################################
    Routes
    ######################################
*/
app.use('/api', apiRoutes)







/*

    For cold start use only
    i.e. if database is new 

    Run the following function to cold start the database

*/


// const coldStart = require('./src/utils/coldStartHandler')
// coldStart()








app.listen(PORT, () => {
    console.log("Verzeo company app is running on " + PORT)
})