

const express = require('express'); // expres instans kan starte app
const app = express();
//hvilken port API bruger
const port = 3000;

const logger = require('morgan');// henter morgan og putter den ned i en variable
app.use(logger('dev')); //Sender besked tilbage til terminalen, hvis nogen benytter min localhost. Den giver også besked om fejl, hvis der bliver skrevet forkert i browseren.
// vi siger til app at den skal bruges til logger

const bodyParser = require('body-parser'); //tag imod bodyien i requesten
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// hent API routes
let directories = ['routes'];

directories.forEach(directory=>{
    fs.readdirSync(path.join(__dirname, directory)).forEach(file=>{
        require(path.join(__dirname, directory, file))(app);
    });
});
// siger hvilken mappe der skal bruges til de statiske filer
app.use(express.static('public'));


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`App is listening on http://localhost:${port}`);
});