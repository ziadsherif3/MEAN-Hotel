const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports.register = function (req, res) {

    console.log(`Registeration of ${req.body.username}.`);

    User
        .findOne({
            username: req.body.username
        })
        .exec((err, doc) => {
            if (doc) {
                console.log('User already exists.');
                res.status(400).json('duplicate user');
            }
            else if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                User
                    .create({
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                        name: req.body.name || null
                    }, (err, result) => {
                        if (!err) {
                            console.log(`Registeration succeeded.`);
                            res.status(201).json(result);
                        }
                        else {
                            console.log(err);
                            res.status(400).json(err);
                        }
                    });
            }
        });
};

module.exports.login = function (req, res) {

    console.log(`Login of ${req.body.username}.`);

    User
        .findOne({
            username: req.body.username,
        }).exec((err, doc) => {
            const response = {
                data: doc,
                status: 200
            };

            if (doc) {
                if(bcrypt.compareSync(req.body.password, doc.password)){
                    console.log(`Login succeeded.`);
                    const token = jwt.sign({ username: doc.username}, 'secret', { expiresIn: 3600 });
                    response.data = {success: true, token: token};
                }
                else {
                    console.log(`Login failed, wrong password.`);
                    response.status = 401;
                    response.data = 'Unauthorized.';
                }
            }
            else if (err) {
                console.log(err)
                response.status = 500;
                response.data = err;
            }
            else {
                response.status = 404;
                response.data = { "Message": "No users found." };
            }
            res.status(response.status).json(response.data);
        });
};

module.exports.authenticate = function(req, res, next) {
    const headerExists = req.headers.authorization;

    if (headerExists) {
        const token = headerExists.split(' ')[1];
        jwt.verify(token, 'secret', (error, decoded) => {
            if (error) {
                console.log(error);
                res.status(401).json('Unauthorized.');
            }
            else {
                next();
            }
        });
    }
    else {
        console.log('Token not found.');
        res.status(403).json('Token not found.');
    }
};