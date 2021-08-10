//The function which gets triggered by clicking add to cart button
function displayTotal(frm, product) {
	var qty;
	var price;
	var index;
				
	qty = parseInt(frm.quantity.value);
				
	if (qty == 0) {
		alert("A quantity must be selected to add the product into the cart!");
	} else {
		index = products.indexOf(product);
		price = productPrices[index] * qty;
					
		if (product == "Acoustic Guitar" || product == "Violin" || product == "Piano") {
			var choices = frm.color;
			var selection;
						
			for(i = 0; i < choices.length; i++) {
				//Disabling radio buttons of the user selected product
				choices[i].disabled = true;
				if (choices[i].checked) {
					selection = choices[i].value;
					product += " (" + selection + ")";
				}
			}	
		} 
					
		//Displaying selected products inside the invoice section
		document.getElementById("displaySelectedProducts").innerHTML += "Product : " + product + "<br>";
		document.getElementById("displaySelectedProducts").innerHTML += "Quantity : " + qty + "<br>";
		document.getElementById("displaySelectedProducts").innerHTML += "Price : " + price + "<br><br>";
					
		//Disabling quantity input and add to cart button of the user selected product
		frm.quantity.disabled = true;
		frm.addToCart.disabled = true;
		
		total += price;
		//Displaying total bill as user selects products at the bottom of the form section
		document.getElementById("total").innerHTML = "LKR " + total;
	}
}
			
//The function which gets triggered on change of first name and last name input fields and will also get called by finalValidation() function
function validateName(field, value) {
	var nvalidation;
	
	if (value.length == 0) {
		alert(field + " cannot be empty!");
		nvalidation = false;
	} else if (isNaN(value) == false) {
		alert(field + " cannot be a number!");
		nvalidation = false;
	} else {
		nvalidation = true;
	}
				
	if (field == "First name") {
		validation1 = nvalidation;
	} else {
		validation2 = nvalidation;
	}
}
			
//The function which gets triggered on change of email input field and will also get called by finalValidation() function
function validateEmail(value) {
	if (value.length == 0) {
		alert("Email cannot be empty!");
		validation3 = false;
	} else if ((value.includes("@") == false) || (value.includes(".") == false) || (isNaN(value) == false)) {
		alert("Please enter a valid email!");
		validation3 = false;
	} else {
		validation3 = true;
	}
}
			
//The function which gets triggered on change of address input field and will also get called by finalValidation() function
function validateAddress(value) {
	if (value.length == 0) {
		alert("Address cannot be empty!");
		validation4 = false;
	} else if (isNaN(value) == false) {
		alert("Address cannot be a number!");
		validation4 = false;
	} else {
		validation4 = true;
	}
}
			
//The function which gets triggered on change of cardNumber input field and will also get called by finalValidation() function
function validateCardNumber(value) {
	if (value.length == 0) {
		alert("Card number cannot be empty!");
		validation5 = false;
	} else if (isNaN(value) == true) {
		alert("Card number cannot contain letters!");
		validation5 = false;
	} else if ((value.length < 15) || (value.length > 15)) {
		alert("Card number must be 15 digits!");
		validation5 = false;
	} else {
		validation5 = true;
	}
}
			
//The function which gets triggered on change of CSN input field and will also get called by finalValidation() function
function validateCSN(value) {
	if (value.length == 0) {
		alert("CSN cannot be empty!");
		validation6 = false;
	} else if (isNaN(value) == true) {
		alert("CSN cannot contain letters!");
		validation6 = false;
	} else if ((value.length < 4) || (value.length > 4)) {
		alert("CSN must be 4 digits!");
		validation6 = false;
	} else {
		validation6 = true;
	}
}
			
//The function which will get called by finalValidation() function
function validateExpireDate(value) {
	if (value.length == 0) {
		alert("Expire date cannot be empty!");
		validation7 = false;
	} else {
		validation7 = true;
	}				
}
			
//The function which will get called by validateForm() function
function finalValidation() {
	var ref = document.customerDetails;
				
	validateName("First name", ref.firstName.value);
	validateName("Last name", ref.lastName.value);
	validateEmail(ref.emailAddress.value);
	validateAddress(ref.address.value);
	validateCardNumber(ref.cardNumber.value);
	validateCSN(ref.csn.value);
	validateExpireDate(ref.expireDate.value);
				
	if (validation1 && validation2 && validation3 && validation4 && validation5 && validation6 && validation7) {
		validation = true;
	}
}
			
//The function which will get called by validateForm() function
function displayOrder() {
	var name = document.customerDetails.firstName.value + " " + document.customerDetails.lastName.value;
	var email = document.customerDetails.emailAddress.value;
	var address = document.customerDetails.address.value;
				
	//Displaying personal details of the customer inside the invoice section
	document.getElementById("displayDetails").innerHTML += "Name : " + name + "<br>";
	document.getElementById("displayDetails").innerHTML += "Email : " + email + "<br>";
	document.getElementById("displayDetails").innerHTML += "Address : " + address + "<br>";
				
	//Displaying the total bill of the customer inside the invoice section
	document.getElementById("finalTotal").innerHTML = "LKR " + total;
}
			
//The function which gets triggered on the click of place order button inside the checkout form section
function validateForm() {
	if (total == 0) {
		alert("You must have at least one item in your cart to proceed!");
	} else {
		finalValidation();
		if (validation) {
			document.getElementById("orderSummary").style.display = "block";
			displayOrder();
		}
	}
}
			
//The function which gets triggered on the click of close button inside the invoice section
function closeOrderSummary() {
	document.getElementById("orderSummary").style.display = "none";
	alert("Thank you for shopping with us!!!");
	clearOrder();
}
			
//The function which will get called by closeOrderSummary() and will also get triggered by reset order button inside the checkout form section
function clearOrder() {
	document.getElementById("orderSummary").style.display = "none";
	var ielements = document.getElementsByClassName("qty");
	var belements = document.getElementsByClassName("addCart");
				
	for (i = 0; i < ielements.length; i++) {
		//Enabling all the add to cart buttons and quantity input fields in each products
		belements[i].disabled = false;
		ielements[i].disabled = false;
		// Seeting the value inside quantity input fields to 0
		ielements[i].value = "0";
	}
				
	var relements = document.getElementsByClassName("color");
				
	for (j = 0; j < relements.length; j++) {
		//Enabling all the radio buttons in each products which have them
		relements[j].disabled = false;
					
		//Keeping first radio button checked in each radio button set
		if (j % 3 == 0) {
			relements[j].checked = true;
		}
	}
				
	//Replacing images of products which have radio buttons matching the first radio button
	document.images[2].src = '../images/store/guitar-brown.jpg';
	document.images[3].src = '../images/store/violin-brown.jpg';
	document.images[4].src = '../images/store/piano-brown.jpg';
				
	//Clearing out all the input field inside the checkout form
	document.customerDetails.firstName.value = "";
	document.customerDetails.lastName.value = "";
	document.customerDetails.emailAddress.value = "";
	document.customerDetails.address.value = "";
	document.customerDetails.cardNumber.value = "";
	document.customerDetails.csn.value = "";
	document.customerDetails.expireDate.value = "";
				
	//Clearing out personal details inside the invoice section
	document.getElementById("displayDetails").innerHTML = "";
				
	//Clearing out seclected products details inside the invoice section
	document.getElementById("displaySelectedProducts").innerHTML = "";
				
	//Setting the total back to zero
	total = 0;
	//Setting the validation back to false
	validation = false;
				
	//Displaying total bill as zero inside the checkout section
	document.getElementById("total").innerHTML = "LKR " + total;
}
			
var products = ["Acoustic Guitar", "Violin", "Drum Set", "Piano", "Harmonica", "Gramophone", "Thriller", "Kuweni Concert Ticket"]; //Array containing all the products
var productPrices = [10000, 7500, 20000, 50000, 5000, 10000, 4000, 2500]; //Array containing prices of each products coressponding to products array
var total = 0; //Variable to hold the bill total
var validation = false; //Variable to validate all the input fields filled by the customer
var validation1; //Variable to validate first name
var validation2; //Variable to validate last name
var validation3; //Variable to validate email
var validation4; //Variable to validate address
var validation5; //Variable to validate card number
var validation6; //Variable to validate csn
var validation7; //Variable to validate expire date