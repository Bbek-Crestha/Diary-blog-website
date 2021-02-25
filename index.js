const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const homeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed nibh nibh. Praesent facilisis tristique scelerisque. Cras nec varius mauris, eu sagittis ligula. Morbi in dolor sed risus pellentesque tempor. Suspendisse bibendum magna ut turpis euismod cursus. Etiam a mattis est, sit amet rhoncus nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum nisl justo, fermentum sit amet neque eget, tincidunt egestas velit. Sed vel lorem libero. Fusce quis sodales sem. Etiam non orci libero. Proin efficitur nisi laoreet urna aliquam posuere. Curabitur condimentum lacus ex. Donec eu lacinia tortor.";

const contactContent = "Cras sed tempor libero. Praesent quis ultrices ante, vestibulum sagittis lorem. Donec imperdiet lorem metus, vitae condimentum erat volutpat id. Mauris fringilla eros eros, eget pretium tellus euismod in. Pellentesque et porttitor lectus. Integer dictum iaculis rutrum. Nunc quis lectus sem. Quisque at magna mattis, venenatis tortor vitae, fringilla arcu.";

const aboutContent = "Nulla sagittis commodo magna, quis interdum leo auctor quis. Vivamus ac neque vehicula, commodo magna vitae, tincidunt risus. Maecenas sed orci condimentum, facilisis justo eu, mattis dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. In pellentesque ex nec velit eleifend congue. Vestibulum condimentum posuere nisl, nec cursus lacus fermentum eu. Sed tincidunt nulla velit, a viverra tellus rhoncus quis. Phasellus in eros erat.";

var posts = [];

app.get("/", function(req, res) {
    res.render("home", {
        homeText: homeContent,
        posts: posts
    });
});

app.get("/contact", function(req, res) {
    res.render("contact", {
        contactText: contactContent
    });
});

app.get("/about", function(req, res) {
    res.render("about", {
        aboutText: aboutContent
    });
});

app.get("/compose", function(req, res) {
    res.render("compose", {

    });
});

app.get("/post/:postName", function(req, res) {
    requestedName = _.lowerCase(req.params.postName);
    posts.forEach(function( post) {
        const savedName = _.lowerCase(post.contentTitle);
        if(requestedName === savedName) {
            res.render("post", {
                contentTitle: post.contentTitle,
                content: post.content
            })
        }
    });
})

app.post("/compose", function(req, res) {
    var post = {
        contentTitle: req.body.title,
        content: req.body.message
    }
    posts.push(post);

    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server is running at port 3000.");
});

var slice = function (data) {
    return data.slice(0,101);
}