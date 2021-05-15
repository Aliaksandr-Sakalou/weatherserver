const express = require('express');
const path = require('path');
const hbs = require('hbs');


const app = express();

//def express config paths
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsDirectoryPath=path.join(__dirname, '../templates/views');
const partialsPath=path.join(__dirname, '../templates/partials');

//setup static dir to server
app.use(express.static(publicDirectoryPath));

//handlebars setup & folder
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsPath);

//app.get('', (req, res) => {
//    res.send(index.html);
//});

app.get('', (req, res) => {
    res.render('index',
    {
        title: 'Weather title',
        name:'John'
    }
    );
})

app.get('/about', (req, res) => {
    res.render('about',
    {
        title: 'About',
        name:'John'
    }
    );
})

app.get('/help', (req, res) => {
    res.render('help',
    {
        message: "belieb"        
    }
    );
})

app.get('/weather', (req, res) => {
    if (req.query.location) {        
    res.send([{
        location:req.query.location,
        weather:'rain'}
        ]);
    }
    else return res.send({
        error: 'did you forget to provide location?'
    })
})

app.get('/products', (req,res)=>{
    if (!req.query.search) {
        return res.send({
           error:'provide search term'
       })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    }) 
})

app.get('/help/*',(req,res)=> {
    res.send('help article not found')
})

app.get('*',(req,res)=> {
    res.send('my 404 page')
})

//app.com
//app.com/help

app.listen(3000, () => { console.log('server is running on 3000') });