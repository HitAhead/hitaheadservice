// Purpose : Should register the user
// to an MQ and creates a slots for him
// on that day


// Import
// AMQP - node js based MQ library
// config - config for hit ahead

var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Local dependencies
var mqConnector = require('./mqConnector');
var hospitalMock = require('./hospitalMock');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Socket Connection initiation

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.get('/', function(req, res){
  console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
});
// Create a rest end point
// for register slot

// slot contract
// {
//   userID:''
//  ,city:''
//  ,hospitalLocality:''
//  ,department:''
//  ,doctorID:''
//  ,slotID:''
//  ,opptDate:''
//  ,onBehalfOf:''
//  ,patientID:''
// }

app.post('/register', function (req, res) {

    console.log(req.body);
    var userObject = {};
    userObject.userID = req.body.userID;
    userObject.onBehalfOf = req.body.onBehalfOf;
    userObject.patientID = req.body.patientID;

    var hospitalDetail = {};
    hospitalDetail.city = req.body.city;
    hospitalDetail.hospitalName = req.body.hospitalName;
    hospitalDetail.hospitalLocality = req.body.hospitalLocality;
    hospitalDetail.department = req.body.department;
    hospitalDetail.doctorID = req.body.doctorID;

    var mqConnection = mqConnector.getMQConnection();
    mqConnection.on('ready',function(){
      console.log(hospitalMock.getQueueName(hospitalDetail));
      mqConnection.publish(hospitalMock.getQueueName(hospitalDetail)
      ,userObject
      ,{
        "content_type":"application/json"
      });
      console.log('Message sent');
    });

    mqConnection.on('error',function(err){
      console.log(err);
    });
    res.send('Hello World!');
});

http.listen(3000, function () {
  console.log('Example app listening at http://%s:%s');
});
