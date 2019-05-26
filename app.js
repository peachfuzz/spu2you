/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";

/******************************************************************************
 * Module dependencies.
 *****************************************************************************/

var express = require("express");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session"); // idk...
var bodyParser = require("body-parser"); // causes infinite redirect if removed
var methodOverride = require("method-override");
var passport = require("passport");
var moment = require("moment");
var Spooky = require("spooky");

const request = require("request");
const Browser = require("zombie");
// Browser.localhost("https://app.ohmnilabs.com", 3000);

var config = require("./config");
// var util = require("util"); // idk...
// var bunyan = require("bunyan"); // idk...

// set up database for express session
// var MongoStore = require("connect-mongo")(expressSession); // idk...
// var mongoose = require("mongoose"); // idk...

// Start QuickStart here

var OIDCStrategy = require("passport-azure-ad").OIDCStrategy;

// idk...
// var log = bunyan.createLogger({
//   name: "Microsoft OIDC Example Web Application"
// });

/******************************************************************************
 * Set up passport in the app
 ******************************************************************************/

//-----------------------------------------------------------------------------
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session.  Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
//-----------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
    done(null, user.oid);
});

passport.deserializeUser(function(oid, done) {
    findByOid(oid, function(err, user) {
        done(err, user);
    });
});

// array to hold logged in users
var users = [];

var findByOid = function(oid, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        // log.info("we are using user: ", user);
        if (user.oid === oid) {
            return fn(null, user);
        }
    }
    return fn(null, null);
};

//-----------------------------------------------------------------------------
// Use the OIDCStrategy within Passport.
//
// Strategies in passport require a `verify` function, which accepts credentials
// (in this case, the `oid` claim in id_token), and invoke a callback to find
// the corresponding user object.
//
// The following are the accepted prototypes for the `verify` function
// (1) function(iss, sub, done)
// (2) function(iss, sub, profile, done)
// (3) function(iss, sub, profile, access_token, refresh_token, done)
// (4) function(iss, sub, profile, access_token, refresh_token, params, done)
// (5) function(iss, sub, profile, jwtClaims, access_token, refresh_token, params, done)
// (6) prototype (1)-(5) with an additional `req` parameter as the first parameter
//
// To do prototype (6), passReqToCallback must be set to true in the config.
//-----------------------------------------------------------------------------
var env = process.argv[2] || "dev";
var base_url = "https://spu2you.com";

switch (env) {
    case "dev":
        base_url = "http://localhost:3000";
        break;
}

var access_token = "";

passport.use(
    new OIDCStrategy(
        {
            identityMetadata: config.creds.identityMetadata,
            clientID: config.creds.clientID,
            responseType: config.creds.responseType,
            responseMode: config.creds.responseMode,
            redirectUrl: base_url + config.creds.redirectUrl,
            allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
            clientSecret: config.creds.clientSecret,
            validateIssuer: config.creds.validateIssuer,
            isB2C: config.creds.isB2C,
            issuer: config.creds.issuer,
            passReqToCallback: config.creds.passReqToCallback,
            scope: config.creds.scope,
            loggingLevel: config.creds.loggingLevel,
            nonceLifetime: config.creds.nonceLifetime,
            nonceMaxAmount: config.creds.nonceMaxAmount,
            useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
            cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
            clockSkew: config.creds.clockSkew
        },
        function(iss, sub, profile, accessToken, refreshToken, done) {
            if (!profile.oid) {
                return done(new Error("No oid found"), null);
            }
            // asynchronous verification, for effect...
            process.nextTick(function() {
                findByOid(profile.oid, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        // "Auto-registration"
                        console.log("auto registration???");
                        users.push(profile);
                        return done(null, profile);
                    }
                    return done(null, user);
                });
            });
            access_token = accessToken; // is this good?
        }
    )
);

//-----------------------------------------------------------------------------
// Config the app, include middlewares
//-----------------------------------------------------------------------------
var app = express();

app.set("views", __dirname + "/client/build");
app.use(express.logger()); // idk...
app.use(methodOverride());
app.use(cookieParser());

// set up session middleware
// if (config.useMongoDBSessionStore) {
//   mongoose.connect(config.databaseUri);
//   app.use(
//     express.session({
//       secret: "secret",
//       cookie: { maxAge: config.mongoDBSessionMaxAge * 1000 }
// store: new MongoStore({
//   mongooseConnection: mongoose.connection,
//   clear_interval: config.mongoDBSessionMaxAge
// })
//     })
//   );
// } else {
app.use(
    expressSession({
        secret: "keyboard cat", // is this safe???
        resave: true,
        saveUninitialized: false
    })
);
// }

app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(__dirname + "/client/build")); // ???
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//-----------------------------------------------------------------------------
// Set up the route controller
//
// 1. For 'login' route and 'returnURL' route, use `passport.authenticate`.
// This way the passport middleware can redirect the user to login page, receive
// id_token etc from returnURL.
//
// 2. For the routes you want to check if user is already logged in, use
// `ensureAuthenticated`. It checks if there is an user stored in session, if not
// it will call `passport.authenticate` to ask for user to log in.
//-----------------------------------------------------------------------------

var user_email = "";
var user_info;
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
var once = 0;
app.get("/", ensureAuthenticated, function(req, res) {
    res.render("index", { user: req.user });
    user_info = req.user._json;
    user_email = req.user._json.email;

    // adds users when they are sent home
    if (once === 0) {
        request.post(
            "http://spu2you-af.azurewebsites.net/api/Orchestrator?code=" +
                config.azureFunctionCode +
                "==&func=addUser&uEmail=" +
                user_email
        );
        once = 1;
    }

    // var prot = req.protocol;
    // var host = req.get("host");
    // console.log(prot + "://" + host);
});

app.get("/api/user", ensureAuthenticated, function(req, res) {
    res.json(user_email);
});

// one way we can "authenticate" azure functions: af gets "/api/access_token"
app.get("/api/access_token", function(req, res) {
    res.json(access_token);
});

app.get("/calendar", ensureAuthenticated, function(req, res) {
    res.render("index", { user: req.user });
});

app.get("/reservations", ensureAuthenticated, function(req, res) {
    res.render("index", { user: req.user });
});

app.get("/robot", ensureAuthenticated, function(req, res) {
    res.render("index", { user: req.user });
});

app.get(
    "/login",
    function(req, res, next) {
        passport.authenticate("azuread-openidconnect", {
            response: res, // required
            resourceURL: config.resourceURL, // optional. Provide a value if you want to specify the resource.
            customState: "my_state", // optional. Provide a value if you want to provide custom state value.
            failureRedirect: "/"
        })(req, res, next);
    },
    function(req, res) {
        // log.info("Login was called in the Sample");
        res.redirect("/");
    }
);

// 'GET returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// query (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.get(
    "/auth/openid/return",
    function(req, res, next) {
        passport.authenticate("azuread-openidconnect", {
            response: res, // required
            failureRedirect: "/"
        })(req, res, next);
    },
    function(req, res) {
        // log.info("We received a return from AzureAD.");
        res.redirect("/");
    }
);

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.post(
    "/auth/openid/return",
    function(req, res, next) {
        passport.authenticate("azuread-openidconnect", {
            response: res, // required
            failureRedirect: "/"
        })(req, res, next);
    },
    function(req, res) {
        // log.info("We received a return from AzureAD.");
        res.redirect("/");
    }
);

// 'logout' route, logout from passport, and destroy the session with AAD.
app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        req.logOut();
        res.redirect(config.destroySessionUrl + base_url);
    });
});

const times_in_day = {
    dates: [
        "7:30am-10:30am",
        "8:00am-11:00am",
        "8:30am-11:30am",
        "9:00am-12:00pm",
        "9:30am-12:30pm",
        "10:00am-1:00pm",
        "10:30am-1:30pm",
        "11:00am-2:00pm",
        "11:30am-2:30pm",
        "12:00pm-3:00pm",
        "12:30pm-3:30pm",
        "1:00pm-4:00pm",
        "1:30pm-4:30pm",
        "2:00pm-5:00pm",
        "2:30pm-5:30pm",
        "3:00pm-6:00pm",
        "3:30pm-6:30pm",
        "4:00pm-7:00pm",
        "4:30pm-7:30pm",
        "5:00pm-8:00pm",
        "5:30pm-8:30pm"
    ]
};

const timeID = {
    "7:30am-10:30am": 1,
    "8:00am-11:00am": 2,
    "8:30am-11:30am": 3,
    "9:00am-12:00pm": 4,
    "9:30am-12:30pm": 5,
    "10:00am-1:00pm": 6,
    "10:30am-1:30pm": 7,
    "11:00am-2:00pm": 8,
    "11:30am-2:30pm": 9,
    "12:00pm-3:00pm": 10,
    "12:30pm-3:30pm": 11,
    "1:00pm-4:00pm": 12,
    "1:30pm-4:30pm": 13,
    "2:00pm-5:00pm": 14,
    "2:30pm-5:30pm": 15,
    "3:00pm-6:00pm": 16,
    "3:30pm-6:30pm": 17,
    "4:00pm-7:00pm": 18,
    "4:30pm-7:30pm": 19,
    "5:00pm-8:00pm": 20,
    "5:30pm-8:30pm": 21
};
// 2137
var date = moment().format("YYYYMMDD");

app.get("/azure/get_my_reservations", ensureAuthenticated, function(req, res) {
    // /azure/get_reservations?date=12-12-19
    // Reminder: if link found, someone can get reservations for any user

    var options = {
        url:
            "https://spu2you-af.azurewebsites.net/api/Orchestrator?code=" +
            config.azureFunctionCode +
            "==&func=getActiveUserReservations&uEmail=" +
            user_email
    };

    date = moment(req.query.date); // might use this variable bc it might be faster

    request.get(options, (error, response, body) => {
        var ret = [];
        var timeID = "";
        for (var key in JSON.parse(body)) {
            timeID = times_in_day.dates[JSON.parse(body)[key].TimeID.value - 1]; // time_in_day.dates is an array

            ret.push({
                date: JSON.parse(body)[key].ResDate.value.substr(0, 10),
                time: timeID,
                reservationID: JSON.parse(body)[key].ResID.value
            });
        }
        res.json({ dates: ret });
    });
});

app.get("/azure/get_reservations", ensureAuthenticated, function(req, res) {
    // /azure/get_reservations?date=12-12-19
    var options = {
        url:
            "https://spu2you-af.azurewebsites.net/api/Orchestrator?code=" +
            config.azureFunctionCode +
            "==&func=getAvailableTimeSlots&date=" +
            req.query.date
    };
    request.get(options, (error, response, body) => {
        if (Object.keys(body).length !== 0) {
            // supposed to get number of keys but just returns character count 🤷‍
            var dates = [];
            var last5 = [];
            var indexCount = 1;

            if (body == "{}") {
                // no used time slots, push all
                dates = times_in_day.dates;
            } else {
                for (var key in JSON.parse(body)) {
                    if (JSON.parse(body).hasOwnProperty(key)) {
                        if (
                            indexCount >
                            JSON.parse(body)[key.toString()].TimeID.value
                        ) {
                            continue;
                        }
                        if (last5.length > 5) {
                            // ok to push first index and remove from last5
                            dates.push(last5[0]);
                            last5.splice(0, 1);
                        }
                        if (
                            JSON.parse(body)[key.toString()].TimeID.value ==
                            indexCount
                        ) {
                            last5.push(
                                times_in_day.dates[
                                    JSON.parse(body)[key.toString()].TimeID
                                        .value - 1
                                ]
                            );
                            if (indexCount == 21) {
                                dates.push.apply(dates, last5);
                            }
                            indexCount++;
                        } else {
                            // count is off -- indicates a missing timeID from list (reserved)
                            last5.splice(0, 5);
                            indexCount += 6;
                        }
                    }
                }
            }

            var r = {};

            if (dates === undefined || dates.length === 0) {
                r.dates = ["no dates"];
            } else {
                r.dates = dates;
            }

            res.json(r);
        } else {
            res.json(times_in_day);
        }
    });
});

app.post("/azure/post_reservation", ensureAuthenticated, function(req, res) {
    // /azure/post_reservations?date=191221
    var options = {
        url:
            "https://spu2you-af.azurewebsites.net/api/Orchestrator?code=" +
            config.azureFunctionCode +
            "==&func=addReservation&date=" +
            moment(req.query.date).format("YYYYMMDD") +
            "&timeID=" +
            timeID[req.query.time] +
            "&uEmail=" +
            user_email
    };

    // add reservation format: spu2you-af...orchestrator...func=addReservation&date=20190507&timeID=2&uEmail=hector@spu.edu
    // request res's for specific user ...&func=getReservations&uEmail=hector@spu.edu
    // reminder: if unreservable conflict appointments are reserved by user x, they will show in user x's appointments === bad
    request.post(options, (error, response, body) => {
        // res.json(body);
        if (error) {
            res.json({ bad: error });
        } else {
            res.json({ res: response, bod: body });
        }
    });
});

/*
    Unusable technologies and reasons why:
        Cheerio - only parses data, doesn't run javascript and ohmnilabs is in React (JavaScript)
    
    Potential technologies w/ issues:
        JSDOM
        ZombieJS
        CasperJS - .start is not a function ??
        PhantomJS/SlimerJS
*/
app.get("/check_into_reservation", ensureAuthenticated, (req, res) => {
    // sets start and end time to arbitrarily be now and yesterday
    // if no date/time passed in, these will be the default
    var reservation_start_time = moment().format();
    var reservation_end_time = moment()
        .subtract(1, "d") // change to subtract after not dev
        .format();

    // sets the time
    if (req.query.date && req.query.time) {
        reservation_start_time = moment(
            req.query.date + req.query.time,
            "YYYYMMDDHH:mma"
        );
        reservation_end_time = moment(
            req.query.date + req.query.time,
            "YYYYMMDDHH:mma"
        ).add(3, "h");
    }

    // isSameOrBefore()/isSameOrAfter() defaults to now
    // https://momentjs.com/docs/#/query/is-same-or-before/
    if (
        moment(reservation_start_time).isSameOrBefore() &&
        moment(reservation_end_time).isSameOrAfter()
    ) {
        // const browser = new Browser();

        // browser.on("authenticate", function(authentication) {
        //     authentication.username = config.hectorUN;
        //     authentication.password = config.hectorPW;
        // });

        // browser.visit("https://app.ohmnilabs.com/my-bots", function() {
        // going to spu.edu and clicking a link works...
        // browser.visit("https://canvas.spu.edu", function() {
        //     console.log("contents of page");
        //     console.log(browser.source);
        //     console.log(browser.location.href);
        // browser.clickLink(".full-hero__link");

        // console.log(browser.html(".box__header h2"));
        // console.log("starting form");
        // browser.click("input[value=Continue]");
        // creds
        // browser.fill("input[name=j_username]", config.hectorUN);
        // browser.fill("input[name=j_password]", config.hectorPW);
        // creds

        // console.log("filled out form");
        // console.log(browser.html("input[name=username]"));
        // console.log(browser.html("input[name=password]"));
        // console.log("😛", browser.text(".button--primary")); // this returned button text
        // console.log(browser.location.href);

        // browser.document.forms[0].submit();
        // browser.click(".button--primary", function() {
        // current issue: stays on the same page even after button click
        //     console.log("Clicked button!");
        //     console.log(browser.html("input[name=username]"));
        //     console.log(browser.html("input[name=password]"));
        //     console.log(browser.html(".button--primary"));
        //     console.log(browser.location.href);
        //     console.log("header: ", browser.text(".box__header h2"));
        //     console.log("😛", browser.text(".button--primary")); // this returned button text
        // });
        // console.log(browser.location.href);
        // browser.pressButton(".button--primary"); // maybe working??
        // console.log("😛", browser.text(".button--primary")); // this returned button text

        // browser.wait().then(function() {
        //     console.log("Form submitted ok!");
        //     console.log(browser.html("input[name=username]"));
        //     console.log(browser.html("input[name=password]"));
        //     console.log(browser.location.href);
        //     console.log(browser.text(".box__header h2"));

        // browser.wait().then(function() {
        //     console.log(browser.location.href);
        //     console.log("Going to settings");
        //     browser.click(".action.action--setting");
        //     browser.wait().then(function() {
        //         console.log("Adding user");
        //         browser.fill(
        //             "form.invite-user input",
        //             "dominguezmah@spu.edu"
        //         );
        //         browser.click("form.invite-user input");
        //     });
        // });

        // });

        // frontend will check if res.body === y or n and will send to /robot if y
        res.json({
            body: "y"
        });
        // });

        // }
    } else {
        res.json({
            body: "n"
        });
    }
});

app.post("/azure/delete_reservations", ensureAuthenticated, function(req, res) {
    // /azure/delete_reservations?date=12-12-19
    var options = {
        url:
            "https://spu2you-af.azurewebsites.net/api/Orchestrator?code=" +
            config.azureFunctionCode +
            "==&func=deleteReservation&ResID=" +
            req.query.ResID +
            "&user=" +
            user_email
    };

    request.post(options, (error, response, body) => {
        res.json(body);
    });
});

// needs to be at the bottom
// still doesn't work...
// app.get("*", function(req, res) {
//   res.render("index", { user: req.user });
// });

app.listen(process.env.PORT || 3000);
