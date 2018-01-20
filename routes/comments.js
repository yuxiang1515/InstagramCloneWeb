var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var Photo = require("../models/photo");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.post("/", middleware.isLoggedIn, function(req, res) {
    Photo.findById(req.params.id, function(err, foundPhoto) {
        if (err) {
            console.log("find error");
        } else {
            Comment.create(req.body.comment, function(err, newlyCreated) {
                if (err) {
                    console.log("create error");
                } else {
                    
                    newlyCreated.author.username = req.user.username;
                    newlyCreated.author.id = req.user._id;     
                    newlyCreated.save();
                    foundPhoto.comments.push(newlyCreated._id);
                    foundPhoto.save();
                    res.redirect("/photos/"+req.params.id);
                }
            });
        }
    }) ;
});

module.exports = router;