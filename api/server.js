// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();

const Users = require('./users/model');

server.get('/', (req, res) => {
    res.send('API running');
})

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The users information could not be retrieved"
            })
        })
});

// server.get('/api/users/:id', (req, res) => {

// });

// server.post('/api/users', (req, res) => {

// });

// server.put('/api/users/:id', (req, res) => {

// });

// server.delete('/api/users/:id', (req, res) => {

// });


module.exports = server; // EXPORT YOUR SERVER instead of {}