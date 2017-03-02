var express             = require('express')
var expressNunjucks     = require('express-nunjucks')
var bodyParser          = require('body-parser');
var sassMiddleware      = require('node-sass-middleware')
var path                = require('path')
var mongoose            = require('mongoose');


//APP
var app = express();


//CONFIG NUNJUCKS
app.set('views', __dirname + '/views');

const njk = expressNunjucks(app, {
    watch: true,
    noCache: true
});

//MONGOOSE
var mongoDB = 'mongodb://lorenzo.caldara:lorenzo74@ds145009.mlab.com:45009/dev_finanzadomani';
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