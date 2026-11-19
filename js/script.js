// Form

const form = document.getElementById("contact-form");
const forMessage = document.getElementById("form-message");

if (form && forMessage) {

	form.addEventListener("submit", function(event) {
		
//Prevent the form from submitting instantly 

		event.preventDefault();

//Values

			const name = document.getElementById("name").value.trim();
			const email = document.getElementById("email").value.trim();
			const phone = document.getElementById("phone").value.trim();
			const queryType = document.getElementById("query-type").value;
			const message = document.getElementById("message").value.trim();
			const namePattern = /^[\p{L}\s'-]+$/u;

//Clear previous messages

			forMessage.textContent = "";
			forMessage.style.color = "";

//Check all required fields are completed

			if (

				name === "" ||
				email === "" ||
				phone === "" ||
				queryType === "" ||
				message === ""
			) 

			{
				showError("Please complete all required fields.");
				return;
			}

//Validate name

			if (!namePattern.test(name)) {
    		
    		showError("Full name must contain letters only. Numbers are not allowed.");
    		
    		return;
			
			}

//Validate email

			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (!emailPattern.test(email)) {
				showError("Please enter a valid email address");
				return;
			}

//Validate phone number 

			const phonePattern = /^\+?[0-9\s()-]{7,20}$/;
			const digits = phone.replace(/\D/g, "");

			if (!phonePattern.test(phone) || digits.length < 7){
				showError("Please enter a valid phone number");
				return;
			}

//Check that the message contains at least 20 characters

			if (message.length < 20) {
				showError("Your message must contain at least 20 characters.")
				return;
			}

//Display a confirmation message and reset

			forMessage.textContent = "Cheers, " + name + "! Your enquiry has been registered succesfully.";
			forMessage.style.color = "green";
			form.reset();

		});

//Display validation errors

			function showError(message) {
				forMessage.textContent = message;
				forMessage.style.color = "red";
			}
}


// Shopping Cart

const cartButton = document.getElementById("cart-button");
const cartPanel = document.getElementById("cart-panel");

if (cartButton && cartPanel) {

	cartButton.addEventListener("click", function() {

		cartPanel.classList.toggle("open");

		cartButton.setAttribute("aria-expanded", 
			cartPanel.classList.contains("open"));
	
	});

}

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCart = document.getElementById('clear-cart');

addToCartButtons.forEach(function(button) {

	button.addEventListener("click", function() {

		const name = button.dataset.name;
		const price = Number(button.dataset.price);

		cart.push({name: name, price: price});

		updateCart();

		console.log(cart);

	});

});

function updateCart() {

	cartItems.innerHTML = "";

	let total = 0;

	if (cart.length === 0) {

		cartItems.innerHTML = '<p>Your cart is empty.</p>';

	}

	cart.forEach(function(product, index) {

		cartItems.innerHTML += 
			'<div class="cart-item">' +

			'<p>' + product.name + ' - €' +
			product.price.toFixed(2) + '</p>' +

			'<button type="button" class="remove-item" ' + 
			'aria-label="Remove product" ' + 
			'onclick="removeProduct(' + index + ')">' +
			'<i class="fa-solid fa-trash"></i>' + 
			'</button>' + 

			'</div>';

		total = total + product.price;

	});

	cartCount.textContent = cart.length;

	cartTotal.textContent = total.toFixed(2);

	localStorage.setItem("cart", JSON.stringify(cart));
}


function removeProduct(index) {

	cart.splice(index, 1);

	updateCart();
}

if (clearCart) {

	clearCart.addEventListener("click", function() {

		cart.length = 0;

		updateCart();

	});
}

if (cartItems && cartCount && cartTotal) {

	updateCart();

}