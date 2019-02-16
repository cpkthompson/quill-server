var express = require("express");
var bodyParser = require('body-parser');
var Delta = require('quill-delta');


const {convertHtmlToDelta, convertDeltaToHtml} = require('node-quill-converter');
const Sentry = require('@sentry/node');

var app = express();

Sentry.init({dsn: 'https://7204ae43c545464d9507b749800126aa@sentry.io/1395724'});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});

app.get('/', function (req, res) {
    res.redirect('https://api.judy.legal/dashboard/');
});

app.post('/delta', function (req, res) {
    var caseHtmlString = req.body.case;
    res.json(convertHtmlToDelta(caseHtmlString))
});
app.post('/html', function (req, res) {
    req.setTimeout(300000);
    var delta = req.body.delta;
    res.json(convertDeltaToHtml(delta))
});
