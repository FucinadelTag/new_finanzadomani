var express             = require('express')
var expressNunjucks     = require('express-nunjucks');
var dateFilter          = require('nunjucks-date-filter');
var session             = require('express-session');
var flash               = require('express-flash');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var sassMiddleware      = require('node-sass-middleware')
var path                = require('path')
var mongoose            = require('mongoose');
const busboyBodyParser  = require('busboy-body-parser');



//APP
var app = express();
var sessionStore = new session.MemoryStore;


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());

//READ ENV CONSTANT
require('dotenv').config()


//CONFIG NUNJUCKS
app.set('views', __dirname + '/views');

const njk = expressNunjucks(app, {
    watch: true,
    noCache: true
});

njk.env.addFilter('date', dateFilter);

//MONGOOSE
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//SASS MIDDLEWARE
app.use(sassMiddleware({
    /* Options */
    src: './public/styles',
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
}));

//BODY
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(busboyBodyParser());

//PUBLIC
app.use(express.static(path.join(__dirname, 'public')));


//ROUTERS
let admin = require('./routes/admin');
app.use('/admin', admin);

let index = require('./routes/index');
app.use('/', index);




app.listen(3030, function () {
  console.log('Example app listening on port 3030!')
})