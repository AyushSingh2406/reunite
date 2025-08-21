const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // This is the fix: Use the full URL of your deployed backend
        callbackURL: 'https://reunite-vh55.onrender.com/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists in our database
            let user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
                // If user exists, but doesn't have a googleId, link the account
                if (!user.googleId) {
                    user.googleId = profile.id;
                    await user.save();
                }
                done(null, user);
            } else {
                // If user doesn't exist, create a new one
                const newUser = new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                });
                user = await newUser.save();
                done(null, user);
            }
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};
