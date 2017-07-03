var express = require('express'),

app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'),
    bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var routes = require('./api/routes/userRoutes');
routes(app);


app.get('*',function(req,res){
    res.json("Not found");
});

app.listen(port);

console.log('e buisiness RESTful API server started on: ' + port);
