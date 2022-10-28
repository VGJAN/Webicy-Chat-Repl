// Initialize Firebase
var config = {
	apiKey: "AIzaSyD_Rq60pDAiRZs3TmRKFaS1noQfapFg67w",
	authDomain: "bamboo-host-324719.firebaseapp.com",
	databaseURL: "https://bamboo-host-324719-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "bamboo-host-324719",
	storageBucket: "bamboo-host-324719.appspot.com",
	messagingSenderId: "1089061856563",
	appId: "1:1089061856563:web:244662e679edbac7268a46"
};
firebase.initializeApp(config);

//Get elements
var messageList = document.getElementById('message-list');
var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');

//Create variables
var messagesRef = firebase.database().ref('messages');


// Listen for form submit
messageForm.addEventListener('submit', submitForm);

//Submit form
function submitForm(e) {
	e.preventDefault();

	//Get value
	var message = messageInput.value;

	//Save Message
	saveMessage(message);

	//Show alert
	document.querySelector('.alert').style.display = 'block';

	//Hide alert after 3 seconds
	setTimeout(function () {
		document.querySelector('.alert').style.display = 'none';
	}, 3000);

	//Clear input field
	messageInput.value = '';
}

//connect to the firebase and fetch the messages
//Listen for realtime changes
messagesRef.limitToLast(10).on('value', function (snapshot) {
	//Get messages object
	var messages = snapshot.val();

	//Loop through the messages object
	for (var key in messages) {
		var text = messages[key].message;
		var user = messages[key].user;

		//Create a li element
		var messageElement = document.createElement('li');
		messageElement.innerHTML = user + ": " + text;

		//Append li to ul
		messageList.appendChild(messageElement);
	}
});


//Function to save the messages
function saveMessage(message) {
	//Create variable to store message data
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
		message: message,
		user: username
	});
}