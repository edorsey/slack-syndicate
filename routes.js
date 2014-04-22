var IndexHelper = require('./controllers/index.js');
var WebhookHelper = require('./controllers/webhook.js');

module.exports = function(app, io){
    IndexHelper.add_routes(app);
    WebhookHelper.add_routes(app, io);
    //ApiHelper.add_routes(app);

};