const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const path = require('path');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');



const email = process.env.MAILER_EMAIL_ID || 'emarshall3235@gmail.com';
const pass = process.env.MAILER_PASSWORD || 'cca#3235';

const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass: pass
  }
});

var options = {
  viewEngine: {
      extname: '.hbs',
      layoutsDir: 'templates/',
      // defaultLayout : 'template',
      partialsDir : 'views/partials/'
  },
  viewPath: 'templates/',
  extName: '.hbs'
};

var handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(options));



//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const User = require("../../models/User");

//@route POST api/users/register
//@desc Register users
//@access Public
router.post("/register", (req, res) => {
  //Form validation

  
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({$or:[{ email: req.body.email }, { username: req.body.username }]})
    .then(user => {
      if (user) {
        const valErrors = {}
        if (user.username === req.body.username) {
          valErrors.username = "Username already exists"
        }
        if (user.email === req.body.email) {
          valErrors.email = "Email already exists"
        }
        

        return res.status(400).json(valErrors)
        
      }      
      
      

      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      //Hash password before saving to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })
    })
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  //Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email })
    .then(user => {
      //Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //User matched
            //Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email
            }

            //Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 //1year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                })
              }
            )
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" })
          }
        })
    })
})

router.post('/forgot_password', (req, res) => {
  async.waterfall([
    (done) => {      
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (user) {
                    
          done(err, user);
        } else {
          done('User not found')
        }
      })
    }, (user, done) => {
      //create random token
      crypto.randomBytes(20, (err,  buffer) => {
        const token = buffer.toString('hex');
        done(err, user, token);
      })
    }, (user, token, done) => {
      
      console.log(token);
      console.log(Date.now() + 86400000);
      
      
      User.findOneAndUpdate(
        {_id: user.id}, 
        {reset_password_token: token, reset_password_expires: Date.now() + 86400000 },
        {upsert: true, new: true}).exec((err, new_user) => {
          console.log(new_user);          
          
          done(err, token, new_user)
        })
    }, (token, user, done) => {
      const data = {
        to: user.email,
        from: email,
        template: 'forgot-password-email',
        subject: 'Password help has arrived!',
        context: {
          url: 'http://localhost:3000/reset_password?token=' + token,
          name: user.name
        }
      }

      const mailOptions = {
        from: email, // sender address
        to: 'iamelimars@yahoo.com', // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>'// plain text body
      };



      smtpTransport.sendMail(data, err => {

        if (!err) {
          console.log('worked');
          
          return res.json({ message: 'Kindly check your email for further instructions' })
        } else {  
          console.log(err);
                  
          return done(err)
        }
      })
    }
  ], err => {
    return res.status(422).json({message: err})
  })
})

router.post('/reset_password', (req, res, next) => {
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec((err, user) => {
    console.log(user);
    
    if (!err && user) {
      if (req.body.newPassword === req.body.verifyPassword) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, (err, hash) => {

            user.password = hash;             
            user.reset_password_token = '';
            user.reset_password_expires = Date.now();

            user.save(err => {
              if (err) {
                return res.status(422).send({ message: err })
              } else {
                const data = {
                  to: user.email,
                  from: email,
                  template: 'reset-password-email',
                  subject: 'Password reset confirmation',
                  context: {
                    name: user.name
                  }
                }
    
                smtpTransport.sendMail(data, err => {
                  if (!err) {
                    return res.json({ message: 'Password Reset' })
                  } else {                    
                    return res.status(422).send({ message: err })
                  }
                })
              }
            })


          })
        })
        // user.reset_password_token = '';
        // user.reset_password_expires = Date.now();
        // console.log(user);
        
        // user.save(err => {
        //   if (err) {
        //     return res.status(422).send({ message: err })
        //   } else {
        //     const data = {
        //       to: user.email,
        //       from: email,
        //       template: 'reset-password-email',
        //       subject: 'Password reset confirmation',
        //       context: {
        //         name: user.name
        //       }
        //     }

        //     smtpTransport.sendMail(data, err => {
        //       if (!err) {
        //         return res.json({ message: 'Password Reset' })
        //       } else {
        //         return res.json({ message: 'Error resetting password' })
        //       }
        //     })
        //   }
        // })
      } else {
        return res.status(422).send({ message: 'Passwords do not match' })
      }
    } else {
      return res.status(422).send({ message: 'Password reset token is invalid or has expired' })
    }
  })
})

module.exports = router;
