// const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

chai.use(chaiHttp);
chai.should();

describe('user.service.js tests', () => {
    describe('/ tests', () => {
        it('GET', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/signup tests', () => {
        it('GET', (done) => {
            chai.request(app)
                .get('/signup')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it.skip('POST', (done) => { // need to mock dynamo for this
            chai.request(app)
                .post('/signup/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'ccc', email: 'ccc', password: 'ccc' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/signup tests', () => {
        it('GET', (done) => {
            chai.request(app)
                .get('/signup')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it.skip('POST', (done) => { // need to mock dynamo for this
            chai.request(app)
                .post('/signup/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'ccc', email: 'ccc', password: 'ccc' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/login tests', () => {
        it('GET ', (done) => {
            chai.request(app)
                .get('/login')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('404 tests', () => {
        it('GET not existin route', (done) => {
            chai.request(app)
                .get('/zzz')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
