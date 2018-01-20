var Photo = require("../models/photo");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error", "You must log in first!");
        res.redirect("/login");
    }
};

middlewareObj.hasPhotoOwnerShip = function(req, res, next) {
    Photo.findById(req.params.id, function(err, foundPhoto) {
        if (err) {
            console.log("found error");
        } else {
            if (req.user._id.equals(foundPhoto.author.id)) {
                next();
            } else {
                res.redirect("back");
            }
        }
    });
};

module.exports = middlewareObj;