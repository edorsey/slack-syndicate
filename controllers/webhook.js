exports.add_routes = function (app, io) {

	var webhookData;

	var incomingHook = function(data) {
		webhookData = {
			time : new Date(),
			req : data,
			res : null,
			error : null,
			data : [],
		};
		io.sockets.emit('webhook', webhookData);
	}

	var hookResponse = function(data) {
		webhookData.res = data;
		return data;
	}

	var hookError = function(data) {
		webhookData.error = data;
	}

	var hookData = function(data) {
		webhookData.data.push(data);
		return data;
	}

	incomingHook(null);

	app.post('/webhook/slack', function(req, res) {
		console.log(req);
		incomingHook(req.body);
		res.end();
	});

	app.get('/webhook/console', function(req, res) {
		res.json(webhookData);
	});
}