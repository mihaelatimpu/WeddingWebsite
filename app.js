var express = require('express'),
app = express();
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 8080
const db = require('./public/js/queries')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/home.html'));
});

app.get('/confirmations', db.getPresences)
app.get('/absences', db.getAbsences)
app.post('/confirmation', db.addPresence)
app.post('/confirmAbsence', db.addAbsence)


app.get('/getConfirmations.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/confirmations.html'));
});

app.get('/confirm.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/confirm.html'));
});
app.get('/confirm_presence.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/confirm_presence.html'));
});
app.get('/confirm_absence.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/confirm_absence.html'));
});


app.get('/header.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/header.html'));
});

app.get('/contact.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/contact.html'));
});

app.get('/home.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/home.html'));
});

app.get('/information.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/information.html'));
});

app.get('/photos.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/photos.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/error.html'));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
