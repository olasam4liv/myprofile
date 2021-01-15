 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAD0oQ2mW2WfiZRCHa8tM_QGAmlD0BLBmg",
    authDomain: "samuel-olatunji.firebaseapp.com",
    databaseURL: "https://samuel-olatunji.firebaseio.com",
    projectId: "samuel-olatunji",
    storageBucket: "samuel-olatunji.appspot.com",
    messagingSenderId: "1083305842379",
    appId: "1:1083305842379:web:4c0e01fe396cdc87d3ed4e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Refrence messages collestion
  var messagesRef = firebase.database().ref('messages');

const contactForm= document.querySelector('#contact-form')

contactForm.addEventListener('submit', function(e){
	e.preventDefault(); 

	  submitForm()
 })

 function submitForm(){
	 
	 //get values
	const name = getInputValue('name').trim();
	const subject = getInputValue('subject').value.trim();
	const email = getInputValue('email').value.trim();
	const message = getInputValue('message').value.trim();  
    
	 saveMessage(name, subject, email, message);
   
	console.log(saveMessage)
	 
	// Show Alert
	document.querySelector('.alert').style.display='block'
	//Hide alert
	setTimeout(() => {
		document.querySelector('.alert').style.display='none'
	}, 3000);
	//clear fields
	 clearFields();
 }

 function getInputValue(id){
	 return document.getElementById(id);	 
 }


 function clearFields(){
	 setTimeout(function(){
		document.querySelector('#contact-form').reset();
	 }, 2000)
	
}

function saveMessage(name, subject, email, message){
newMessageRef = messagesRef.push();
newMessageRef.set({
		name: name,
        subject: subject,
        email, email,
        message: message
});
}