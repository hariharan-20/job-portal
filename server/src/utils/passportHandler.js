const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user/user");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const Passport = function (passport) {

    // passport.use(
    //     new GoogleStrategy({
    //             clientID: 'GOOGLE_CLIENT_ID',
    //             clientSecret: 'GOOGLE_CLIENT_SECRET',
    //             callbackURL: "/auth/google/callback",
    //         },
    //         async (accessToken, refreshToken, profile, done) => {
    //             const newUser = {
    //                 name: profile.name.givenName + " " + profile.name.familyName,
    //                 email: profile.emails[0].value
    //             };

    //             try {
    //                 let user = await User.findOne({
    //                     email:profile.emails[0].value
    //                 });

    //                 if (user) {
    //                     done(null, user);
    //                 } else {
    //                     user = await User.create(newUser);
    //                     done(null, user);
    //                 }
    //             } catch (err) {
    //                 console.error(err);
    //             }
    //         }
    //     )
    // );


    passport.use(
        new LocalStrategy({
            usernameField: "email"
        }, (email, password, done) => {
            if (!email || !password) {
                return done(null, false, {
                    message: 'Fill up all the details'
                })
            }

            console.log("Local Strategy Working");

            User.findOne({
                email: email,
            }).populate('userrole').then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: "Email is not registered"
                    });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "Password incorrect"
                        });
                    }
                });
            });
        })
    );


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });


    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id).populate('userrole')
            done(null, user)
        } catch (e) {
            // Log error to the Log Database
            done(e, null)
        }
    });
};



module.exports = Passport;