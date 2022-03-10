// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();
server.use(express.json());

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

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        });
    } else {
        Users.insert(user)
            .then(newUserCreated => {
                res.status(201).json(newUserCreated);
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the user to the database",
                    error: err.message
                })
            })
    };
});

// server.put('/api/users/:id', (req, res) => {

// });

// server.delete('/api/users/:id', (req, res) => {

// });


module.exports = server; // EXPORT YOUR SERVER instead of {}