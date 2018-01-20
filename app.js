var      express = require("express"),
             app = express(),
  methodOverride = require("method-override"),
      bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
           Photo = require("./models/photo"),
         Comment = require("./models/comment"),
            User = require("./models/user"),
        passport = require("passport"),
   LocalStrategy = require("passport-local"),
           flash = require("connect-flash");
   
var  photoRoutes = require("./routes/photos"),
   commentRoutes = require("./routes/comments"),
     indexRoutes = require("./routes/index");
      
mongoose.connect("mongodb://localhost/instagram");
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Super Hero Iron Man",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/photos", photoRoutes);
app.use("/photos/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Instagram App start running!')
});


    