import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { config } from '.';

const { google, facebook } = config;
const { serverURL, apiURL } = config.app;

const User = mongoose.model('User');

const secret = config.jwt.jwtSecret;

const opts = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(opts as StrategyOptions, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch(err => {
        return done(err, false);
      });
  }),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: `${serverURL}/${apiURL}/${google.callbackURL}`,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.email })
        .then(user => {
          if (user) {
            return done(null, user);
          }

          const name = profile.displayName.split(' ');

          const newUser = new User({
            provider: 'google',
            googleId: profile.id,
            email: profile.email,
            firstName: name[0],
            lastName: name[1],
            avatar: profile.picture,
            password: null,
          });

          newUser.save((err, user) => {
            if (err) {
              return done(err, false);
            }

            return done(null, user);
          });
        })
        .catch(err => {
          return done(err, false);
        });
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: facebook.clientID,
      clientSecret: facebook.clientSecret,
      callbackURL: `${serverURL}/${apiURL}/${facebook.callbackURL}`,
      profileFields: ['id', 'displayName', 'name', 'emails', 'picture.type(large)'],
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id })
        .then(user => {
          if (user) {
            return done(null, user);
          }

          const newUser = new User({
            provider: 'facebook',
            facebookId: profile.id,
            email: profile.emails ? profile.emails[0].value : null,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            avatar: profile.photos[0].value,
            password: null,
          });

          newUser.save((err, user) => {
            if (err) {
              return done(err, false);
            }

            return done(null, user);
          });
        })
        .catch(err => {
          return done(err, false);
        });
    },
  ),
);
