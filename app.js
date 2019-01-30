var express = require('express');
var exphs = require('express-handlebars');
var app = express();
var port = 500;
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var url = require('url');
var fs = require('fs');
var timeStamp = require('./timeStamp');
var nodeEvents = require('../Week3/node_modules/nodeEvent');

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

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//Route to index.html
router.get('/', function(req,res){
    //res.sendfile(path.join(__dirname+'/index.html'));
    var title = "Welcome to the game app page";

    res.render('index', {title:title});
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

http.createServer(function(req,res){
    //File system response
    /*
    fs.readFile('index.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
    */
    nodeEvents.nodeevents();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h1> Welcome to the Homepage! </h1>");
    res.write("The day and time is:" + timeStamp.timeStamp() + "<br>");
    res.write("This is the url you requested" + req.url + "<br>");
    var q = url.parse(req.url, true).query;
    var resTxt = q.id + " " + q.user;
    var qList = url.parse(req.url,true)
    console.log(qList.host);//localHost:3000
    console.log(qList.pathName);//users.html
    console.log(qList.search);//id and user
    res.end(resTxt);
    
}).listen(3030);