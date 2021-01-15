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
    
	 
    const saveDataRef = {
        name: name,
        subject: subject,
        email, email,
        message: message
 		} 
	console.log(saveDataRef)
	 
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