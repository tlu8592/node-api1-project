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
                message: "The users information could not be retrieved",
                error: err.message
            })
        })
});

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist",    
                })
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be acheived",
                error: err.message
            })
        }) 
});

// server.post('/api/users', (req, res) => {

// });

// server.put('/api/users/:id', (req, res) => {

// });

// server.delete('/api/users/:id', (req, res) => {

// });


module.exports = server; // EXPORT YOUR SERVER instead of {}