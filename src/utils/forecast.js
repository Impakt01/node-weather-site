const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=97c6f2198cdc25cad81451b9c28f93d5&query=' + latitude + "," + longitude + '&units=f'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)

        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees but it feels like ' + body.current.feelslike + ' degree out.')

        }

    })
}

module.exports = forecast