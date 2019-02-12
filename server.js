var express = require("express");
var bodyParser = require('body-parser');


const {convertHtmlToDelta, convertDeltaToHtml} = require('node-quill-converter');

var app = express();
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


app.post('/delta', function (req, res) {
    var caseHtmlString = req.body.case;
    res.json(convertHtmlToDelta(caseHtmlString))
});
app.post('/html', function (req, res) {
    var caseDelta = req.body.delta;
    res.json(convertDeltaToHtml(caseDelta))
});
