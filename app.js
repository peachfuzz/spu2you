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
// var util = require("util"); // idk...
var bunyan = require("bunyan"); // idk...
var config = require("./config");

// set up database for express session
var MongoStore = require("connect-mongo")(expressSession); // idk...
var mongoose = require("mongoose"); // idk...

// Start QuickStart here

var OIDCStrategy = require("passport-azure-ad").OIDCStrategy;

// idk...
var log = bunyan.createLogger({
  name: "Microsoft OIDC Example Web Application"
});

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
    log.info("we are using user: ", user);
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
passport.use(
  new OIDCStrategy(
    {
      identityMetadata: config.creds.identityMetadata,
      clientID: config.creds.clientID,
      responseType: config.creds.responseType,
      responseMode: config.creds.responseMode,
      redirectUrl: config.creds.redirectUrl,
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
            users.push(profile);
            return done(null, profile);
          }
          return done(null, user);
        });
      });
    }
  )
);

//-----------------------------------------------------------------------------
// Config the app, include middlewares
//-----------------------------------------------------------------------------
var app = express();

// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");
app.set("views", __dirname + "/client/build");
// app.set("view engine", "js");
app.use(express.logger()); // idk...
app.use(methodOverride());
app.use(cookieParser());

// set up session middleware
if (config.useMongoDBSessionStore) {
  mongoose.connect(config.databaseUri);
  app.use(
    express.session({
      secret: "secret",
      cookie: { maxAge: config.mongoDBSessionMaxAge * 1000 },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        clear_interval: config.mongoDBSessionMaxAge
      })
    })
  );
} else {
  app.use(
    expressSession({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: false
    })
  );
}

app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(__dirname + "/client/build")); // ???
// app.use(express.static(__dirname + '/public'));
app.set("views", __dirname + "/client/build");
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
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("trying to redirect");
  res.redirect("/login");
}

app.get("/", ensureAuthenticated, function(req, res) {
  res.render("index", { user: req.user });
});

app.get("/calendar", ensureAuthenticated, function(req, res) {
  res.render("index", { user: req.user });
});
app.get("/reservation", ensureAuthenticated, function(req, res) {
  res.render("index", { user: req.user });
});
app.get("/robot", ensureAuthenticated, function(req, res) {
  res.render("index", { user: req.user });
});
// app.get("*", ensureAuthenticated, (req, res) => { // this doesn't work :(
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

// '/account' is only available to logged in user

app.get(
  "/login",
  function(req, res, next) {
    console.log("failed auth");
    passport.authenticate("azuread-openidconnect", {
      response: res, // required
      resourceURL: config.resourceURL, // optional. Provide a value if you want to specify the resource.
      customState: "my_state", // optional. Provide a value if you want to provide custom state value.
      failureRedirect: "/"
    })(req, res, next);
  },
  function(req, res) {
    console.log("trying to auth");
    log.info("Login was called in the Sample");
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
    log.info("We received a return from AzureAD.");
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
    log.info("We received a return from AzureAD.");
    res.redirect("/");
  }
);

// 'logout' route, logout from passport, and destroy the session with AAD.
app.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect(config.destroySessionUrl);
  });
});

app.listen(3000);

// ! old app.js
/*
const express = require("express");
const path = require("path");
const request = require("request");
const router = express.Router();
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/", router);

// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error("Database connection failed: " + err.stack);
//     return;
//   }

//   console.log("Connected to database.");
// });

// connection.end();

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Backend listening on ${port}`);

*/
