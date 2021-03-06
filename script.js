if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}
// removeCartButtonItems stores all the variables with the class name 'button-danger'
function ready() {
	let removeCartButtonItems = document.getElementsByClassName("button-danger");
	console.log(removeCartButtonItems);

	// add event listeners - loop through objects
	//make function remove item from cart

	for (let i = 0; i < removeCartButtonItems.length; i++) {
		let button = removeCartButtonItems[i];
		button.addEventListener("click", removeCartItem);
	}

	let quantityInputs = document.getElementsByClassName("cart-quantity-input");
	for (let i = 0; i < quantityInputs.length; i++) {
		let input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}

	let addToCartButtons = document.getElementsByClassName("shop-item-button");
	for (let i = 0; i < addToCartButtons.length; i++) {
		let button = addToCartButtons[i];
		button.addEventListener("click", addToCartClicked);
	}
	document
		.getElementsByClassName("button-purchase")[0]
		.addEventListener("click", purchaseClicked);
}
function purchaseClicked() {
	alert("Thank you for your purchase");
	let cartItems = document.getElementsByClassName("cart-items")[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild);
	}

	updateCartTotal();
}

function removeCartItem(event) {
	let buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal();
}
function addToCartClicked(event) {
	let button = event.target;
	let shopItem = button.parentElement.parentElement;
	let addToCartClicked = shopItem.getElementsByClassName("product-title")[0]
		.innerText;
	let price = shopItem.getElementsByClassName("product-price")[0].innerText;
	let imageSrc = shopItem.getElementsByClassName("product-image")[0].imageSrc;
	console.log(title, price, imageSrc);
	addItemToCart(title, price, imageSrc);
	updateCartTotal();

	function addItemToCart(title, price, imageSrc) {
		let cartRow = document.createElement("div");
		cartRow.classList.add("cart-row");
		let cartItems = document.getElementsByClassName("cart-items")[0];
		let cartItemsNames = cartItems.getElementsByClassName("product-title");
		for (let i = 0; i < cartItemsNames.length; i++) {
			if (cartItemNames[i].innerText == title) {
				alert("This item is already in your basket");
				return;
			}
		}
		let cartRowContents = `
        <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}">
        <span class="cart-item-title"><h5>${title}</h5></span>
    </div>
    <span class="cart-price cart-column"><h5>${price}£20</h5></span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="button button-danger" type="button">REMOVE</button>
    </div>`;
		cartRow.innerHTML = cartRowContents;
		cartItems.append(cartRow);
		cartRow
			.getElementsByClassName("button-danger")[0]
			.addEventListener("click", removeCartItem);
	}
	cartRow
		.getElementsByClassName("cart-quantity-input")[0]
		.addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
	let input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

// Update cart total
// Find the price of all items in each row and the quanity and multiply them
// Add together to get the total

function updateCartTotal() {
	let cartItemContainer = document.getElementsByClassName("cart-items")[0]; //Select first item inside of the array
	let cartRows = cartItemContainer.getElementsByClassName("cart-row");
	let total = 0;
	for (let i = 0; i < cartRows.length; i++) {
		let cartRow = cartRows[i];
		let priceElement = cartRow.getElementsByClassName("cart-price")[0];
		let quantityElement = cartRow.getElementsByClassName(
			"cart-quantity-input"
		)[0];
		let price = parseFloat(priceElement.innerText.replace("£", " ")); //Remove '£' so we can do calculations with this number
		let quanity = quantityElement.value;
		total = total + price * quanity;
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName("cart-total-price")[0].innerText =
		"£" + total;
}
