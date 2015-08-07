var config = require('./config');
var amqp = require('amqp');

var getMQConnection = function() {

    var connection = amqp.createConnection({
        url: config.rabbitmq.url
    });

    return connection;
};

module.exports = {
  getMQConnection:getMQConnection
};
