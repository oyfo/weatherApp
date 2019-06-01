const request = require('request');
const config = require('./../apiid.json');

const options = {
    method: 'GET',
    //  url: 'http://api.openweathermap.org/data/2.5/weather',
    url: 'http://api.openweathermap.org/data/2.5/forecast',
    qs: {
        q: 'London', APPID: config.APIID, cnt: 5, units: 'metric',
    },
    headers:
   {
       // 'cache-control': 'no-cache',
       // Connection: 'keep-alive',
       // 'accept-encoding': 'gzip, deflate',
       // Host: 'api.openweathermap.org',
       'Cache-Control': 'max-age=900', // 'no-cache',
       Accept: '*/*',
   },
};

const getWeatherForCity = city => new Promise((resolve, reject) => {
    // console.log(`city in promise ${city}`);

    options.qs.q = city;
    request(options, (err, res) => {
        if (err) {
            return reject(err);
        }

        return resolve(res);
    });
});

exports.getWeatherForCities = function getWeatherForCities(cities) {
    return new Promise((resolve, reject) => {
        const promiseList = [];
        cities.forEach(city => promiseList.push(getWeatherForCity(city)));
        return Promise.all(promiseList)
            .then(resolve)
            .catch(reject);
    });
};

exports.parseWeatherResponse = function parseWeatherResponse(response) {

};
