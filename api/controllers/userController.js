/**
 * Created by Thundersama on 16.06.2017.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.getUsers = function(req,res){
    /*User.find({}, function(err, users) {
        if (err)
            res.send(err);
        res.json(users)
    })*/
    var maxDistance = req.query.distance || 8;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;

    // find a location
    User.find({
        location: {
            $nearSphere: coords,
            $maxDistance: maxDistance
        }
    },function(err,users){
        if(err)
            res.send(err);
        res.json(users)
    })
};

exports.createUser = function(req,res){
    var id = req.params.userID;
    var obj = {
        userID:id,
        last_updated: new Date(),
        location:{}

    };
    if(req.body.latitude && req.body.longitude){
        obj.location.type = "Point";
        obj.location.coordinates = [req.body.longitude,req.body.latitude];
    }

    if(req.body.username){
        obj.username = req.body.username;
    }

    if(req.body.spotifyURI){
        var song = {
            spotifyURI:req.body.spotifyURI
        };
        if(req.body.interpret){
            song.interpret = req.body.interpret;
        }
        if(req.body.album){
            song.album = req.body.album;
        }
        if(req.body.titel){
            song.titel = req.body.titel;
        }
        obj.song = song;
    }


    var user = new User(obj);
    user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    })
};

exports.updateUser = function(req,res){
    var id = req.params.userID;
    User.findOne({"userID" : id},function(err,user){
        if(err){
            res.send(err)
        }
        if(!user){
            module.exports.createUser(req,res);
        }else{
            var update = {
                last_update: new Date(),
                location : {}
            };
            if(req.body.latitude && req.body.longitude){
                update.location.type = "Point";
                update.location.coordinates = [req.body.longitude,req.body.latitude];
            }
            if(req.body.spotifyURI){
                var song = {
                    spotifyURI:req.body.spotifyURI
                };
                if(req.body.interpret){
                    song.interpret = req.body.interpret;
                }
                if(req.body.album){
                    song.album = req.body.album;
                }
                if(req.body.titel){
                    song.titel = req.body.titel;
                }
                update.song = song;
            }
            User.findOneAndUpdate({userID:id},update,{new:true},function(err,updatedUser){
                if(err){
                    res.send(err)
                }
                res.json(updatedUser)
            })
        }
    })

};