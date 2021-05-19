const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3RhbmlzbGF2YTEyMyIsImEiOiJja25rY3NpejEwOXowMm9wbTV0NDB2eTlmIn0._vZzE2O6TTgqzmQbdecAIw';
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('cannot connect', undefined);
        } else if (body.features.length === 0) {
            callback('empty body :D', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[1].center[0],
                // location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;