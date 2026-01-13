const bodyParser = require('body-parser');
const { Database } = require('./Database/db_interface');
const data = require('./data/data.js');
const express = require('express'); 
const fs = require('fs');
const path = require('path');
const winston = require('winston');


/************* Create Server and Database ****************/
const app = express();
const port = 3000;
const db = new Database('test.db', './Database/database_schema.sql');


/*************** Create Logger **************************/
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info', // logs any message with level 'info' or lower
    format: winston.format.combine(
        winston.format.timestamp({
            format: () => new Date().toLocaleString()
        }),
        winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
    ),
    transports:[
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
    ]
});


/************* Configure Server ****************/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));


/************* Register Middleware ****************/
app.use(bodyParser.urlencoded({extended: true})); //parse request body
app.use(express.json()); //express' built in json parser supercedes body-parser

/* Serve static assets (CSS, client JS, images) from the project root `css/` folder */
app.use('/css', express.static(path.join(__dirname, 'css')));

/* Ensure templates always have a `flag` local to avoid ReferenceError when templates access it */
app.use((req, res, next) => {
    if (typeof res.locals.flag === 'undefined') res.locals.flag = '';
    next();
});


/************* My Middleware ****************/
const attachDatabase = function (req, res, next){
    req.db = db; 
    next(); 
}
app.use(attachDatabase);

const attachLogger = function (req, res, next) {
    logger.info(`${req.method} ${req.url}`);
    req.logger = logger;
    next();
}
app.use(attachLogger);


/************* Populate Database with Data ****************/
if (process.env.TEST_MODE === "true") {
    data.loadTestData(db);
}


/************* Routes ****************/
app.route('/') 
    .get((req, res) => { 
        console.log('someone is on the local host!');
        res.redirect('/dancerForm');
    });

app.route('/signup')
    .get((req, res) => {
        res.render('signup');
        })
    .post((req, res) =>{ 
        let db = req.db;
        let email = req.body.email;
        let studentID = req.body.studentID;

        try{
            db.addDancer(email, studentID);
            console.log('successful signup');
            if (db.dancerExists(email, studentID)) {
                return res.render('login', { flag: 'USER EXISTS' });
            }
            else {
                return res.render('login', { flag: 'SUCCESSFUL SIGNUP' });
            }
        }
        catch (error){
            console.log(error);
            res.render('login', {flag: 'SIGNUP ERROR'});
        }
    });


app.route('/login')
    .get((req, res) => {
        res.render('login', {flag: 'MANUAL'});
    })
    .post((req, res) =>{
        let db = req.db;
        let email = req.body.email;
        let studentID = req.body.studentID;

        try{
            if (db.dancerExists(email, studentID)) {
                return res.render('dancerForm', { flag: 'SUCCESSFUL LOGIN' });
            }
            else{
                return res.render('login', {flag: 'INVALID CREDENTIALS'});
            }
        }
        catch (error){
            res.render('login', {flag: 'LOGIN ERROR'});
        }
    });


app.route('/dancerForm')
    .get((req, res) => {
        const db = req.db;
        const logger = req.logger;
        let email = req.body.email;

        let dances = db.getAllDances();
        let danceNames = [];
        for (let dance of dances) {
            danceNames.push(dance.choreographerName);
        }

        res.render('dancerForm', { danceNames: danceNames });
    })
    .post((req, res) => {
        const db = req.db;
        const logger = req.logger;
        let email = req.body.email;

        db.addDancerInfo(
            req.body.name,
            req.body.pronouns,
            req.body.auditionNumber,
            req.body.phone,
            email,
            req.body.classYear,
            req.body.numDances,
            req.body.pocDance,
            req.body.grizzlies,
            req.body.committee,
            req.body.danceLevel,
            req.body.experience
        )

        let dancePreferences = [];
        for (let choice of ['first-choice', 'second-choice', 'third-choice', 'fourth-choice', 'fifth-choice']) {
            dancePreferences.push(req.body[choice]);
        }
        db.addDancePreferences(email, dancePreferences);



    });

/* Start the server */
app.listen(port, () => {
    console.log(`Server running on port${port}`);
});