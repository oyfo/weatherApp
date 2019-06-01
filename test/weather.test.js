const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
const weather = require('./../src/helpers/weather');
const config = require('./../src/config/apiid.json');

const {
    expect,
} = chai;
chai.use(chaiAsPromised);
nock.disableNetConnect();

before(() => {

});

describe('weather helper', () => {
    describe('getWeatherForCities', () => {
        it('should resolve promise', () => {
           /* nock('http://api.openweathermap.org/data/2.5/forecast',
            // ?q=Warsaw&APPID=17ac356fce697a753b9474155a92c222&cnt=16&units=metric
                {
                    reqheaders: {},
                })
                .get()
                .query({
                    q: 'Warsaw',
                    APPID: config.APIID,
                    cnt: 16,
                    units: 'metric',
                })
                .reply(200, {
                    license: {
                        key: 'ok',
                    },
                });*/
            nock('http://api.openweathermap.org/')
            // ?q=Warsaw&APPID=17ac356fce697a753b9474155a92c222&cnt=16&units=metric
                .get('data/2.5/forecast/')
                .reply(200, {
                    license: {
                        key: 'ok',
                    },
                });

            const resolvedWeather = weather.getWeatherForCity('Warsaw');
            return expect(resolvedWeather).to.eventually.be.fulfilled;
        });
    });
});

after(() => {
});
