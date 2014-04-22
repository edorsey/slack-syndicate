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
		incomingHook(req.body);
		hookData("DATAAAAA" + req.body.text.indexOf('#'));
		io.sockets.emit('webhook', "DATAAAAA" + req.body.text.indexOf('#'));
		if (req.body.text.indexOf('#') > -1) {
			var re = /<(.*?)>/;
			var channels = req.body.text.match(re);
			var json = {
				text : req.body.text,
				channel: channels[1],
				username: req.body.username,
			};
			hookData(channels);
			hookResponse(json)
			res.json(json);
			io.sockets.emit('webhook', { channels : channels });
		}
	});

	app.get('/webhook/console', function(req, res) {
		res.json(webhookData);
	});
}