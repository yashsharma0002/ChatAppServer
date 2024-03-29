/**
 * @description this is service controlling the business logic and traversing controls from controller to model and vice versa
 * @author  Yash
 * @since   14/11/2018
 * @version 2.2.
 * @requires nodemailer, models, nexmo
 */
const models = require('../app/models/user_model');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'labzbridge02@gmail.com',
           pass: 'bridge01!'
       }
   });

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: '123',
    apiSecret: '123'
});

/**
 * @description Sending messages Format
 */
// const Nexmo = require('nexmo');
// const nexmo = new Nexmo({
//     apiKey: YOUR_API_KEY,
//     apiSecret: YOUR_API_SECRET
// });

// nexmo.message.sendSms(
//     YOUR_VIRTUAL_NUMBER, '15105551234', 'yo',
//       (err, responseData) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.dir(responseData);
//         }
//       }
//    );

/**
 * @description Way to setup nodemailer to send mails via gmail service
 * var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'your gmail account email id @gmail.com',
               pass: 'your password'
           }
       });

       const mailOptions = {
        from: 'sender@email.com', // sender address
        to: 'to@email.com', // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>'// plain text body
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
        });
 */
/**
 * @description login service
 */
exports.login_service_function = function(req, callback) {
    
    models.loginDb(req, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {
            let login_string = `Activity Review : Account Login on ${new Date().toDateString()} at ${new Date().toLocaleTimeString()}`;
            const mailOptions = {
                from: 'labzbridge02@gmail.com', // sender address
                to: req.email, // list of receivers
                subject: 'login activity', // Subject line
                html: `<p>${login_string}<br/><br/> Check It ! </p>`// plain text body
            };

            // nexmo.message.sendSms(
            //     9928697100, '8906493110', 'yo',
            //       (err, responseData) => {
            //         if (err) {
            //             console.log('message not sent');                        
            //           console.log(err);
            //         } else {
            //             console.log('message sent');                        
            //           console.dir(responseData);
            //         }
            //     }
            // );
            

            transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log('Login Email not sent');
                    console.log(err)
                }
                else {
                    console.log('Login Email Sent');
                    console.log(info);
                }
                    
            });
            console.log('data on service page');
            console.log(data);

            return callback(null, data);
        }
    });
}

/**
 * @description registration service
 */
exports.register_service_function = function(req, callback) {

    console.log('request on service page');
    console.log(req);
    models.registerDb(req, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {

            const mailOptions = {
                from: 'labzbridge02@gmail.com', // sender address
                to: req.email, // list of receivers
                subject: 'Registration Successful on ChatApp', // Subject line
                html: '<p>Your are most Welcome to chat on ChatApp anytime. Thank You!</p>'// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log('Register Email not sent');
                    console.log(err)
                }
                else {
                    console.log('Register Email Sent');
                    console.log(info);
                }
                    
            });

            return callback(null, data);
        }

    })
}

/**
 * @description registration service
 */
exports.logout_service_function = function(req, callback) {

    models.logoutDb(req, (err, data) => {

        if(err) return callback(err);
        else return callback(null, data);

    })
}