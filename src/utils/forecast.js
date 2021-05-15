const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=612801add6eb5e5e49aa03c1442f66c3&query=" + latitude + "," + longitude;
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        }
        else {
            callback(undefined, body.current);
        }
    })
}

module.exports = forecast;