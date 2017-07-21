/**
 * Created by Thundersama on 16.06.2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username: String,
    last_updated:Date,
    userID:String,
    song:{
        titel:String,
        interpret:String,
        album:String,
        spotifyURI:String,

    },
    location: {
        type: { type: String },
        coordinates: [Number],
    }
});
UserSchema.index({ "location": "2dsphere" });

module.exports = mongoose.model('Users', UserSchema);