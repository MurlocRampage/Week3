var express = require('express');
var app = express();
var port = 500;
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//get rid of warning for Mongoose
mongoose.Promise = global.Promise;

//Connect to mongodb using mongoose
mongoose.connect("mongodb://localhost:27017/gameentries", {
    useMongoClient:true}).then(function(){
        console.log("MongoDB Connected")})
        .catch(function(err){console.log(err)});

//Load in entry Model
require('./models/Entry');
var Entry = mongoose.model('Entries');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//Route to index.html
router.get('/', function(req,res){
    res.sendfile(path.join(__dirname+'/index.html'));
});

app.get('/getdata', function(req,res){
    console.log("request made from fetch");
    Entry.find({}).then(function(entries){
        res.send({
            entries:entries
        });
    });
});

router.get('/entries.html', function(req,res){
    res.sendfile(path.join(__dirname+'/entries.html'));
});

//Post from form on index.html
app.post('/', function(req,res){
   console.log(req.body);
   var newEntry = {
       title:req.body.title,
       genre:req.body.genre
   }
   new Entry(newEntry).save().then(function(entry){
       res.redirect('/')});
});



//routs for paths
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/scripts'));
app.use('/', router);
//starts server
app.listen(port, function(){
    console.log("Server is running on port " + port);
});