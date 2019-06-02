/* eslint-disable no-unused-expressions */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
const weather = require('./../src/helpers/weather');
const config = require('./../src/config/apiid.json');
const data = require('./data');

const {
    expect,
} = chai;
chai.use(chaiAsPromised);
nock.disableNetConnect();

describe('weather helper', () => {
    describe('getWeatherForCitiy', () => {
        it('should resolve promise', () => {
            nock('http://api.openweathermap.org/data/2.5/forecast/', {
                headers: {
                    'Cache-Control': 'max-age=900',
                },
            })
                .get('/')
                .query({
                    q: 'Warsaw',
                    APPID: config.APIID,
                    cnt: 16,
                    units: 'metric',
                })
                .reply(200);
            const resolvedWeather = weather.getWeatherForCity('Warsaw');
            return expect(resolvedWeather).to.eventually.be.fulfilled;
        });

        it('should reject promise', () => {
            nock('http://api.openweathermap.org/data/2.5/forecast/', {
                headers: {
                    'Cache-Control': 'max-age=900',
                },
            })
                .get('/')
                .query({
                    q: 'Warsaw',
                    APPID: config.APIID,
                    cnt: 16,
                    units: 'metric',
                })
                .replyWithError({
                    message: 'something awful happened',
                    code: 'AWFUL_ERROR',
                });

            const resolvedWeather = weather.getWeatherForCity('Warsaw');
            return expect(resolvedWeather).to.eventually.be.rejected;
        });
    });

    describe('getWeatherForCities', () => {
        it('should resolve promise', () => {
            nock('http://api.openweathermap.org/data/2.5/forecast/', {
                headers: {
                    'Cache-Control': 'max-age=900',
                },
            })
                .get('/')
                .query({
                    q: 'Warsaw',
                    APPID: config.APIID,
                    cnt: 16,
                    units: 'metric',
                })
                .reply(200);
            const resolvedWeather = weather.getWeatherForCities(['Warsaw']);
            return expect(resolvedWeather).to.eventually.be.fulfilled;
        });

        it('should reject promise', () => {
            nock('http://api.openweathermap.org/data/2.5/forecast/', {
                headers: {
                    'Cache-Control': 'max-age=900',
                },
            })
                .get('/')
                .query({
                    q: 'Warsaw',
                    APPID: config.APIID,
                    cnt: 16,
                    units: 'metric',
                })
                .replyWithError({
                    message: 'something awful happened',
                    code: 'AWFUL_ERROR',
                });

            const resolvedWeather = weather.getWeatherForCities(['Warsaw']);
            return expect(resolvedWeather).to.eventually.be.rejected;
        });
    });

    describe('parseWeatherResponse', () => {
        it('should return forecast in expected format', () => {
            const res1 = {};
            const res2 = {};
            res1.body = data.responseBody1;
            res2.body = data.responseBody2;
            const forecast = weather.parseWeatherResponse([res1, res2]);
            expect(JSON.stringify(forecast)).to.equal(JSON.stringify(data.forecast));
        });

        it('should retunt empty object it resp code is not 200', () => {
            const res = {};
            res.body = data.responseBody3;
            const forecast = weather.parseWeatherResponse([res]);
            expect(forecast).to.be.empty;
        });
    });
});