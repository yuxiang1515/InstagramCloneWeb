var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Photo = require("../models/photo");
var middlewareObj = require("../middleware");

router.get("/", middlewareObj.isLoggedIn, function(req, res) {
    Photo.find({}, function(err, photos) {
         if (err) {
             console.log("Find photos failed");
         } else {
             res.render('index', {photos: photos});
         }
    });
});

router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    res.render('new'); 
});

router.post("/", middlewareObj.isLoggedIn, function(req, res) {
    var newPhoto = {img: req.body.photo.img, text: req.body.photo.text, author:
        {
            username: req.user.username,
            id: req.user._id
        }
    };
    Photo.create(newPhoto, function(err, newlyCreated){
        if (err) {
            console.log("Create new photo failed");
        } else {
            res.redirect('/photos');
        }
    });
});

router.get("/:id", middlewareObj.isLoggedIn, function(req, res) {
    Photo.findById(req.params.id).populate("comments").exec(function(err, foundPhoto) {
        if (err) {
            console.log("find failed");
        } else {
            res.render('show', {photo: foundPhoto});
        }
    });
});

router.get("/:id/edit", middlewareObj.isLoggedIn, middlewareObj.hasPhotoOwnerShip, function(req, res) {
    Photo.findById(req.params.id, function(err, foundPhoto) {
        if (err) {
            console.log("find failed");
        } else {
            res.render('edit', {photo: foundPhoto});
        }
    });
});

router.put("/:id", middlewareObj.isLoggedIn, middlewareObj.hasPhotoOwnerShip, function(req, res) {
    Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, foundPhoto) {
        if (err) {
            console.log("Put failed");
        } else {
            res.redirect('/photos/'+req.params.id);
        }
    });
});

router.delete("/:id", middlewareObj.isLoggedIn, middlewareObj.hasPhotoOwnerShip, function(req, res) {
    Photo.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log("Delete error");
        } else {
            res.redirect("/photos");
        }
    }) 
});


module.exports = router;
