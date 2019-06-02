const bcrypt = require('bcryptjs');
const db = require('./../helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    create,
    addCity,
    deleteCity,
    getCities,
    deleteUser
};

async function authenticate(req) {
    const { username } = req.body;
    const { password } = req.body;
    const user = await User.findOne({ username: username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutPass } = user.toObject();
        return {
            userWithoutPass
        };
    } else {
        return null;
    }
}

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10); //hash passowrd
    }
    await user.save();
    return user;
}

async function deleteUser(id) {
    await User.deleteOne({'_id': id});
}

async function getCities(id) {
    const user = await User.findById(id);
    if (!user) throw 'User not found';
    return user.cities;
}

async function addCity(id, city) {
    const user = await User.findById(id);
    if (!user) throw 'User not found';
    user.cities.push(city);
    await user.save();
}

async function deleteCity(id, city) {
    const user = await User.findById(id);
    if (!user) throw 'User not found';
    user.cities = user.cities.filter((element) => {return element != city});
    await user.save();
}