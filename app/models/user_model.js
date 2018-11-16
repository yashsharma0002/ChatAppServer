
/**
 * @description linking database with code
 */

// grab the things we need
var mongoose = require('mongoose');
/**
 * @description Everything in mongoose start with schema
 */
var Schema = mongoose.Schema;

/**
 * Every schema maps to MongoDB collection & define schemas shape within collection
 * creating new schema
 */
var userSchema = new Schema({
  email_id: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

/**
 * the schema is useless so far
 * we need to create a model to use it
 * instances of these Models are documents
 * passing modelName - 'users' & schema - 'userSchema' in mongoose.model
 */
var user = mongoose.model('users', userSchema);
/**
 * @description Model created & now functions built below to perform different task on database via model having schema in it
 */

 /**
  * @description Finding data inside database
  * make this available to our users in our Node applications
  */
exports.loginDb = function(req, callback) {

  user.findOne({email_id : req.body.email, password : req.body.passw},function(err, result) {
    if(err) {

      console.log(err);      
      return callback(err);
    } 
    else {
      console.log('Login Successful');
      return callback(null, result);            
    }
  })
}

/**
 * @description saving data inside database
 */
exports.registerDb = function(req, callback) {

  let newUser = new user({
    email_id:req.body.email,
    password:req.body.passw
  });
  
  newUser.save(function (err, result) {
    if(err) 
    {
      console.log(err);
      return callback(err);
    }
    else {
      console.log('Registration Successfully Done');
      return callback(null, result);
    }
  })
}