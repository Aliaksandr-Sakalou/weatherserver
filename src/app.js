const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');



const app = express();
const port = process.env.PORT || 3000;

//def express config paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup static dir to server
app.use(express.static(publicDirectoryPath));

//handlebars setup & folder
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index',
        {
            title: 'Weather title',
            name: 'John'
        }
    );
})

app.get('/about', (req, res) => {
    res.render('about',
        {
            title: 'About',
            name: 'John'
        }
    );
});

app.get('/help', (req, res) => {
    res.render('help',
        {
            message: "belieb"
        }
    );
});

app.get('/weather', (req, res) => {
    
    if (req.query.location) {
        console.log('got location');
        geocode(req.query.location, (error, { latitude, longitude, location } = {})=>{
            if (error) {
                return console.log(error);
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log('Error', error);
                }
                res.send([{
                    location: location,
                    weather: forecastData
                }
                ]);
            });
        });
   
    }
    else return res.send({
        error: 'did you forget to provide location?'
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'provide search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.send('help article not found');
});

app.get('*', (req, res) => {
    res.send('my 404 page');
});

//app.com
//app.com/help

app.listen(port, () => { console.log('server is running on' + port); });