/**
 * @description linking database with code
 * @author Yash
 * @version 11.1
 * @since 12/11/2018
 * @module Server
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
var chatSchema = new Schema({
  sender_id: { type: Schema.Types.ObjectId, ref: 'user' },
  receiver_id: { type: Schema.Types.ObjectId, ref: 'user' },
  message: { type: String},
  sender_email_id: { type: String },
  receiver_email_id: { type: String }
});
/**
 * the schema is useless so far
 * we need to create a model to use it
 * instances of these Models are documents
 * passing modelName - 'users' & schema - 'userSchema' in mongoose.model
 */
var peerschat = mongoose.model('peerschat', chatSchema);
/**
 * @description Model created & now functions built below to perform different task on database via model having schema in it
 * --------------------------------------------------------------------------------------------------------------------------
 */
/**
 * @description prototype based accessing functionality
 */
function chatFunction() {

}
/**
* @description saving data inside database
*/
chatFunction.prototype.peerschatDb_save = function (req, callback) {

  console.log('Request on model page');
  console.log(req);

  let newPeerChat = new peerschat({
    sender_id: req.sender_id,
    receiver_id: req.receiver_id,
    message: req.message,
    sender_email_id: req.sender_email_id,
    receiver_email_id: req.receiver_email_id
  });

  newPeerChat.save(function (err, result) {
    if (err) {
      console.log('error on saving on peer');        
      console.log(err);
      return callback(err);
    }
    else {
        console.log('data on peer ');        
      console.log(result);
      console.log('Message Inserted Successfully Done');
      return callback(null, result);
    }
  })
}

/**
 * @description saving data inside database
 */
chatFunction.prototype.peerschatDb_fetch = function (callback) {

  //   chatsnew.findOne({email_id : 'bridge@gmail.com'}).populate('email_id')

  peerschat.find().populate('newPeerChat')
    .exec(function (err, result) {
      if (err) {
        //   console.log('error on reading - peer');        
        // console.log(err);
        return callback(err);
      }
      else {
        // console.log('Result on reading - peer');
        // console.log(result);

        let peer_chats_format = [];
        result.forEach(function (x) {
          peer_chats_format.push({
            message: x.message,
            sender_email_id: x.sender_email_id,
            receiver_email_id: x.receiver_email_id
          })
        })
        return callback(null, peer_chats_format);
      }
    })
}

/**
 * @exports exporting function
 */
module.exports = new chatFunction;