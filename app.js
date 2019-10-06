var express = require('express'),
app = express();
const path = require('path')
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/home.html'));
});

app.get('/confirm.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/confirm.html'));
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
    res.send("Page not found", 404);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
