/* eslint-disable no-unused-expressions */

// this one needs some work
// proper mock of mongoDB
// parametrization

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const proxyquire = require('proxyquire');

const {
    expect,
} = chai;
chai.use(chaiAsPromised);

function dbStub(responses) { // mock mongoDb funcions with parametrized responses
    const User = {};
    User.findById = () => responses[0];
    User.findOne = () => responses[1];
    User.toObject = () => responses[1];
    User.deleteOne = () => Promise.resolve();
    return { User };
}

function mockeUserService(stub) { // replace db helper witth mock function
    return proxyquire('./../src/user/user.service', {
        './../helpers/db': stub,
    });
}

describe('user.service.js tests', () => {
    describe('getCities() tests', () => {
        it('getCities should return correct city list', (done) => {
            const dbResponse = {
                cities: ['London'],
                _id: '5cf3aacbd35099315c1a153a',
            };

            const userService = mockeUserService(dbStub([dbResponse, ''])); // using response to mock mongodb functions
            userService.getCities('5cf3aacbd35099315c1a153a').then((cityList) => {
                expect(cityList).to.eql(['London']);
                done();
            });
        });
    });

    describe('authenticate() tests', () => {
        // does not work. mongoDB mocking not competely correct
        it.skip('should return user without password', (done) => {
            const dbResponse = {
                cities: ['London'],
                _id: '5cf3aacbd35099315c1a153a',
                username: 'test',
                email: 'test@test.com',
                password:
             '$2a$10$iMtKzKoVAKmN6pfj3SuxpORDUC4Iq122cf2AqQofM.g3zTyfN2VAe',
                __v: 1,
            };

            const req = {
                body: {
                    username: 'test',
                    password: 'test',
                },
            };
            const userService = mockeUserService(dbStub(['', dbResponse]));
            userService.authenticate(req).then((user) => {
                expect(user.userWithoutPass.username).to.be.equal('test');
                expect(user.userWithoutPass.password).to.be.undefined;
                done();
            });
        });

        it('should return null when wrong password is supplied', (done) => {
            const dbResponse = {
                cities: ['London'],
                _id: '5cf3aacbd35099315c1a153a',
                username: 'test',
                email: 'test@test.com',
                password:
             '$2a$10$iMtKzKoVAKmN6pfj3SuxpORDUC4Iq122cf2AqQofM.g3zTyfN2VAe',
                __v: 1,
            };

            const req = {
                body: {
                    username: 'test',
                    password: 'XXXX',
                },
            };
            const userService = mockeUserService(dbStub(['', dbResponse]));
            userService.authenticate(req).then((user) => {
                expect(user).to.be.null;
                done();
            });
        });
    });

    describe('create() tests', () => {
        // does not work. mongoDB mocking not competely correct
        it.skip('should return saved user', () => {
            const dbResponse = {
                cities: ['London'],
                _id: '5cf3aacbd35099315c1a153a',
                username: 'tes',
                email: 'test@test.com',
                password:
             '$2a$10$iMtKzKoVAKmN6pfj3SuxpORDUC4Iq122cf2AqQofM.g3zTyfN2VAe',
                __v: 1,
            };
            const req = {
                body: {
                    username: 'test',
                    password: 'XXXX',
                    email: 'test@test.com',
                },
            };
            const userService = mockeUserService(dbStub(['', dbResponse]));
            userService.create(req.body).then(() => {
                //
            });
        });

        it('should throw when username is taken', () => {
            const dbResponse = {
                cities: ['London'],
                _id: '5cf3aacbd35099315c1a153a',
                username: 'test',
                email: 'test@test.com',
                password:
             '$2a$10$iMtKzKoVAKmN6pfj3SuxpORDUC4Iq122cf2AqQofM.g3zTyfN2VAe',
                __v: 1,
            };
            const req = {
                body: {
                    username: 'test',
                    password: 'XXXX',
                    email: 'test@test.com',
                },
            };
            const userService = mockeUserService(dbStub(['', dbResponse]));
            const userServicePromise = userService.create(req.body);
            return expect(userServicePromise).to.eventually.be.rejectedWith(`Username "${req.body.username}" is already taken`);
        });
    });

    describe('deleteUser() tests', () => {
        it('should resolve', () => {
            const dbResponse = {
                cities: ['London'],
                _id: '5cf3aacbd35099315c1a153a',
                username: 'test',
                email: 'test@test.com',
                password:
             '$2a$10$iMtKzKoVAKmN6pfj3SuxpORDUC4Iq122cf2AqQofM.g3zTyfN2VAe',
                __v: 1,
            };
            const req = {
                body: {
                    username: 'test',
                    password: 'XXXX',
                    email: 'test@test.com',
                },
            };
            const userService = mockeUserService(dbStub(['', dbResponse]));
            const userServicePromise = userService.deleteUser(req.body);
            return expect(userServicePromise).to.eventually.be.fulfilled;
        });
    });

    describe('addCity() tests', () => {
        // wont work, as before
        // const user = await User.findById(id); is not mocked properly
        it.skip('should save user', () => {
        });

        it('should throw when user not found', () => {
            const userService = mockeUserService(dbStub([null, '']));
            const userServicePromise = userService.addCity('2134rfewr34', 'London');
            return expect(userServicePromise).to.eventually.be.rejectedWith('User not found');
        });
    });
});
