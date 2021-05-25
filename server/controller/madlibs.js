const { User } = require("../models/user.js");
const {Madlib} = require("../models/madlib.js")

module.exports = {
    createMadlib: (req, res) =>{
        const madlib = new Madlib();
        madlib.madlib = req.body.madlib;
        madlib.likes = 0;
        madlib.save()
            .then(newMadlib => {
                User.findOne({_id: req.params.id})
                    .then(userData => {
                        console.log ("User Data", userData)
                        userData.madlibs.push(newMadlib)
                        userData.save()
                            .then(updatedUser => {
                                console.log("Madlib created", updatedUser)
                                res.json(updatedUser)
                            })
                            .catch(err => res.json(err))
                    })
                    .catch(err => res.json(err))
            })
            .catch(err => res.json(err))
    },
    showMadlib: (req, res) => {
        Madlib.findOne({_id: req.params.id})
            .then(madlibData => {
                User.findOne({_id: req.params.id})
                    .then(userData => {
                        console.log("User Data", userData)
                        res.json(userData)
                    })
                    .catch(err => res.json(err))
            })
            .catch(err => res.json(err))
    },
    showAll: (req, res) => {
        Madlib.find()
            .then(madlib => {
                User.find()
                    .then(user => res.json(user))
                    .catch(err => res.json(err))
            })
            .catch(err => res.json(err))
    },
    update: (req, res) => {
        // Used to add likes
        Madlib.update({_id:req.params.id}, req.body)
            .then(data => {
                User.findOne({_id: req.params.id})
                .then(userData => {
                    console.log("User Data", userData)
                    res.json(userData)
                })
                .catch(err => res.json(err))
            })
            .catch(err => res.json(err))
    }
}