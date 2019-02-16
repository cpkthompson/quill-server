var express = require("express");
var bodyParser = require('body-parser');
var Delta = require('quill-delta');


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
app.post('/dt', function (req, res) {
    var oldDelta = req.body.oldDelta;
    var deltaChanges = req.body.deltaChanges;
    let delta = new Delta(oldDelta);

    for (let deltaChange of deltaChanges) {
        delta = delta.compose(deltaChange)
    }

    res.json({'delta': delta, 'text': convertDeltaToHtml(delta)})
});
