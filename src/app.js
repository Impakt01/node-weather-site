const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
      title: 'Weather',
      name: 'Tolulope'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
      title: 'About Me',
      name: 'Tolulope'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
     helpText: 'this is some helpfull text',
     title: 'Help',
     name: 'Tolulope'
    })
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send ({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send ({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })


    // res.send({
    //     location: 'Boston',
    //     forecast: 'it is snowing',
    //     address: req.query.address
    // })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Tolulope',
        errorMessage: 'Help article not found not found'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Tolulope',
        errorMessage: 'Page not found'
    })

})

app.listen(3000, () => {
    console.log('Server is up guy')
})