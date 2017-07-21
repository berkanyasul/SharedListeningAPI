/**
 * Created by Thundersama on 16.06.2017.
 */
module.exports = function(app) {
    // todoList Routes
    var userController = require('../controllers/userController');

    app.route('/test')
        .get(function(req,res){
            res.json([{test:1},{test:2}]);
        })

    app.route('/users')
        .get(function(req,res){
            userController.getUsers(req,res)
        })
        .post(function(req,res){
            userController.createUser(req,res)
        });
    app.route('/users/:userID')
        .put(function(req,res){
           userController.updateUser(req,res)
        })
};
