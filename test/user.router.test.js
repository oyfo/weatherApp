const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const router = require('../src/user/user.router');
const app = require('../server.js');

chai.use(chaiHttp);
chai.should();

// const req = {
//     body: {},
// };

// const res = {
//     sendCalledWith: '',
//     send(arg) {
//         this.sendCalledWith = arg;
//     },
// };


describe('user.service.js tests', () => {
    describe('/ tests', () => {
        it('GET', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {

                    //console.log('res');
                    //console.log(res);
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
                   // console.log('res');
                   // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it.skip('POST', (done) => { //need to mock dynamo for this
            chai.request(app)
                .post('/signup/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'ccc', email: 'ccc', password: 'ccc' })
                .end((err, res) => {
                    console.log('res');
                    console.log(res.body);
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
                   // console.log('res');
                   // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it.skip('POST', (done) => { //need to mock dynamo for this
            chai.request(app)
                .post('/signup/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'ccc', email: 'ccc', password: 'ccc' })
                .end((err, res) => {
                    console.log('res');
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
