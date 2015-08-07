var config = {};

config.rabbitmq = {};

config.rabbitmq.username = "guest";
config.rabbitmq.password = "guest";
config.rabbitmq.host = "127.0.0.1";
config.rabbitmq.port = "5672";
config.rabbitmq.url = "amqp://" + config.rabbitmq.username + ":" + config.rabbitmq.password + "@" + config.rabbitmq.host + ":" + config.rabbitmq.port;
config.rabbitmq.defExchangeName = "apl.topic";

module.exports = config;
