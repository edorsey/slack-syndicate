var socket = io.connect('http://localhost:3000');
var logWebhook = function(data) {
	$('<div class="webhook-data" />').text(JSON.stringify(data)).appendTo($('body'));
}
  socket.on('webhook', function (data) {
    console.log(data);
    logWebhook(data);
  });