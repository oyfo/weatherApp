const request = require('request');
const config = require('./../config/apiid.json'); // file not commited - contains APIID

const options = {
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/forecast/',
    qs: {
        q: 'London', APPID: config.APIID, cnt: 16, units: 'metric',
    },
    headers:
    {
        'Cache-Control': 'max-age=900',
    },
};

function getWeatherForCity(city) {
    return new Promise((resolve, reject) => {
        options.qs.q = city;
        // console.log(options);
        request(options, (err, res) => {
            // console.log('res');
            // console.log(res);
            // console.log('err');
            // console.log(err);
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}

function getWeatherForCities(cities) {
    return new Promise((resolve, reject) => {
        const promiseList = [];
        cities.forEach(city => promiseList.push(getWeatherForCity(city)));
        return Promise.all(promiseList)
            .then(resolve)
            .catch(reject);
    });
}

function parseWeatherResponse(response) {
    const forecast = {};
    response.forEach((element) => {
        if (JSON.parse(element.body).cod !== '200') {
            //  console.log('wrong city');
        } else {
            const li = (JSON.parse(element.body).list);
            forecast[JSON.parse(element.body).city.name] = [];
            Object.keys(li).forEach((key) => {
                forecast[JSON.parse(element.body).city.name].push({
                    date: li[key].dt_txt,
                    temp: li[key].main.temp,
                    description: li[key].weather[0].description,
                });
            });
        }
    });
    return forecast;
}

module.exports = {
    getWeatherForCity,
    getWeatherForCities,
    parseWeatherResponse,
};
