/* ----------------------------

	CustomValidation prototype

	- Keeps track of the list of invalidity messages for this input
	- Keeps track of what validity checks need to be performed for this input
	- Performs the validity checks and sends feedback to the front end

---------------------------- */

function CustomValidation(input) {
	this.invalidities = [];
	this.validityChecks = [];

	//add reference to the input node
	this.inputNode = input;

	//trigger method to attach the listener
	this.registerListener();
}

CustomValidation.prototype = {
	addInvalidity: function(message) {
		this.invalidities.push(message);
	},
	getInvalidities: function() {
		return this.invalidities.join('. \n');
	},
	checkValidity: function(input) {
		for ( var i = 0; i < this.validityChecks.length; i++ ) {

			var isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
			}

			var requirementElement = this.validityChecks[i].element;

			if (requirementElement) {
				if (isInvalid) {
					requirementElement.classList.add('invalid');
					requirementElement.classList.remove('valid');
				} else {
					requirementElement.classList.remove('invalid');
					requirementElement.classList.add('valid');
				}

			} // end if requirementElement
		} // end for
	},
	checkInput: function() { // checkInput now encapsulated

		this.inputNode.CustomValidation.invalidities = [];
		this.checkValidity(this.inputNode);

		if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
			this.inputNode.setCustomValidity('');
		} else {
			var message = this.inputNode.CustomValidation.getInvalidities();
			this.inputNode.setCustomValidity(message);
		}
	},
	registerListener: function() { //register the listener here

		var CustomValidation = this;

		this.inputNode.addEventListener('keyup', function() {
			CustomValidation.checkInput();
		});


	}

};



/* ----------------------------

	Validity Checks

	The arrays of validity checks for each input
	Comprised of three things
		1. isInvalid() - the function to determine if the input fulfills a particular requirement
		2. invalidityMessage - the error message to display if the field is invalid
		3. element - The element that states the requirement

---------------------------- */

var nameValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'This input needs to be at least 3 characters',
		element: document.querySelector('label[for="name"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters and numbers are allowed',
		element: document.querySelector('label[for="name"] .input-requirements li:nth-child(2)')
	}
];

var subjectValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3 | input.value.length > 100;
		},
		invalidityMessage: 'This input needs to be between 3 and 100 characters',
		element: document.querySelector('label[for="subject"] .input-requirements li:nth-child(1)')
	},
	 
	
];

var emailValidityChecks = [
	
	{
		isInvalid: function(input) {
			return !input.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g);
		},
		invalidityMessage: 'A valid email is required',
		element: document.querySelector('label[for="email"] .input-requirements li:nth-child(2)')
	}
];

var messageValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 8 ;
		},
		invalidityMessage: 'This input needs to be at least 20 characters',
		element: document.querySelector('label[for="message"] .input-requirements li:nth-child(1)')
	}	
];


/* ----------------------------

	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input

---------------------------- */

var nameInput = document.getElementById('name');
var subjectInput = document.getElementById('subject');
var emailInput = document.getElementById('email');
var messageInput = document.getElementById('message');


nameInput.CustomValidation = new CustomValidation(nameInput);
nameInput.CustomValidation.validityChecks = nameValidityChecks;

subjectInput.CustomValidation = new CustomValidation(subjectInput);
subjectInput.CustomValidation.validityChecks = subjectValidityChecks;

emailInput.CustomValidation = new CustomValidation(emailInput);
emailInput.CustomValidation.validityChecks = emailValidityChecks;

messageInput.CustomValidation = new CustomValidation(messageInput);
messageInput.CustomValidation.validityChecks = messageValidityChecks;




/* ----------------------------

	Event Listeners

---------------------------- */

var inputs = document.querySelectorAll('input:not([type="submit"])');


var submit = document.querySelector('input[type="submit"');
var form = document.getElementById('contact-form');

function validate() {
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].CustomValidation.checkInput();
	}
}

submit.addEventListener('click', validate);
form.addEventListener('submit', validate);
