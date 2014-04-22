var socket = io.connect(window.location.href);
var logWebhook = function(data) {
	$('<div class="webhook-data" />').text(JSON.stringify(data)).appendTo($('body'));
}
  socket.on('webhook', function (data) {
    console.log(data);
    logWebhook(data);
  });