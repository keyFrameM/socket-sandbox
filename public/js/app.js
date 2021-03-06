var name = getQueryVariable('name') || "Anonymous";
var room = getQueryVariable('room') || "not seeing room";
var socket = io();

console.log(name + ' wants to join ' + room);

//update h1 tag
jQuery(".room-title").text(room);


socket.on("connect", function() {
	console.log("connected to socket IO server!");
	socket.emit("joinRoom",{
		name: name,
		room: room
	})
});

socket.on("message", function (message){

	var momentTimestamp= moment.utc(message.timestamp);
	var $message = jQuery('.messages')

	console.log("new message");
	console.log(message.text);

	$message.append("<p><strong>"+message.name+ " " +momentTimestamp.local().format("h:mm a")+ "<strong></p>");
 	$message.append("<p>"+ message.text + "</p>");

})

//handles submitting of new messages
var $form = jQuery("#message-form");

$form.on("submit", function (event){
	event.preventDefault();

	var $message = $form.find('input[name=message]')

	socket.emit("message", {
		name: name,
		text: $message.val()

	});

	$message.val("");

});
