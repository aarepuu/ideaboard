const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../app/models/user");

const configAuth = require("./auth");

module.exports = function (passport) {


  // Signup
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        process.nextTick(function () {
          User.findOne({ "local.email": email }, (err, user) => {
            if (err) {
              return done(err);
            }
            if (user) {
              return done(null, false, "That email is already taken.");
            }

            const newUser = new User();
            newUser.profile.name = req.body.name;
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            // Assume consent at this stage
            newUser.consent = {
              research: Date.now(),
              privacy: Date.now(),
              terms: Date.now(),
            };

            newUser.save((saveErr) => {
              if (saveErr) {
                throw saveErr;
              }
              return done(null, newUser);
            });
          });
        });
      }
    )
  );

  // Login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        User.findOne({ "local.email": email }, (err, user) => {          
          if (err) {
            return done(null, false);
          }
          if (!user) {
            return done(null, false, "No user found.");
          }
          if (!user.validPassword(password)) {
            return done(null, false, "Oops! Wrong password.");
          }          
          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    process.nextTick(function () {
      done(null, { id: user.id });
    });
  });

  passport.deserializeUser((user, done) => {
    process.nextTick(function() {
      User.findById(user.id, (err, user) => {
        done(err, user);
      });
    });
    
  });

  // FACEBOOK ROUTES
  // passport.use(new FacebookStrategy({
  //   clientID: configAuth.facebookAuth.clientID,
  //   clientSecret: configAuth.facebookAuth.clientSecret,
  //   callbackURL: `${configAuth.facebookAuth.callbackURL}`,
  //   scope: ['email', 'public_profile'],
  //   profileFields: ['id', 'email', 'name', 'timezone', 'updated_time', 'gender', 'link', 'locale', 'verified', 'picture.type(large)'],
  //   passReqToCallback: true
  // },

  // function (req, accessToken, refreshToken, profile, cb) {

  //   console.log('profile:')
  //   console.log(profile)

  //   process.nextTick(function () {

  //     User.findOne({ 'facebook.id': profile.id  }, function (err, user) {

  //       if (err)
  //         return cb(err, user, req.query.instance)

  //       if (user)
  //         return cb(null, user, req.query.instance)

  //       let newUser = new User()

  //       newUser.facebook.id = profile.id
  //       newUser.facebook.token = accessToken
  //       newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName

  //       if (profile.emails && (profile.emails.length > 0)) {
  //         newUser.facebook.email = profile.emails[0].value
  //       }

  //       if (profile.photos && (profile.photos.length > 0)) {
  //         newUser.profile.avatar = profile.photos[0].value
  //       }

  //       newUser.profile.name = newUser.facebook.name

  //       newUser.save(function (err) {
  //         if (err)
  //           throw err;

  //         return cb(err, newUser, req.query.instance)
  //       })
  //     })
  //   })
  // }))
};
