document.addEventListener("DOMContentLoaded", function () {
    const orderBtn = document.querySelector("#home .btn");
    const orderPage = document.getElementById("order-page");
    const sectionsToHide = document.querySelectorAll("section:not(#order-page)");

    orderBtn.addEventListener("click", function () {
        sectionsToHide.forEach(section => section.style.display = "none");
        orderPage.style.display = "block";
        window.scrollTo(0, 0);
    });
});

let cartItems = [];
let totalPrice = 0;

function addToCart(itemName, itemPrice, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).value);
    if (qty <= 0 || isNaN(qty)) {
        alert("Please enter a valid quantity.");
        return;
    }
    const existingItem = cartItems.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.qty += qty;
        existingItem.subtotal += qty * itemPrice;
    } else {
        cartItems.push({
            name: itemName,
            price: itemPrice,
            qty: qty,
            subtotal: qty * itemPrice
        });
    }
    totalPrice += qty * itemPrice;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    cartItems.forEach(item => {
        cartDiv.innerHTML += `<p>${item.name} x ${item.qty} = ${item.subtotal} ETB</p>`;
    });
    document.getElementById("total").innerText = totalPrice;
}

function clearCart() {
    cartItems = [];
    totalPrice = 0;
    updateCartDisplay();
}

function proceedToPayment() {
    const deliveryTime = document.getElementById("delivery-time").value;
    if (!deliveryTime) {
        alert("Please enter a delivery time.");
        return;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("deliveryTime", deliveryTime);

    window.location.href = "payment.html";
}

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("user-name").value.trim();
    const phone = document.getElementById("user-phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const dorm = document.getElementById("user-dorm").value;

    if (!name || !phone || !email || !address || !dorm) {
        alert("All fields are required.");
        return;
    }

    const phoneRegex = /^(09|07)\d{8}$/;
    if (!phoneRegex.test(phone)) {
        alert("Invalid phone number! Use 10 digits, starting with 09 or 07.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email address.");
        return;
    }

    const userData = { name, phone, email, address, dorm };
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    alert("Registration successful! You can now order.");

    const sectionsToHide = document.querySelectorAll("section:not(#order-page)");
    sectionsToHide.forEach(section => section.style.display = "none");

    const orderPage = document.getElementById("order-page");
    orderPage.style.display = "block";
    window.scrollTo(0, 0);
}

window.onload = function () {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
        const sectionsToHide = document.querySelectorAll("section:not(#order-page)");
        sectionsToHide.forEach(section => section.style.display = "none");

        const orderPage = document.getElementById("order-page");
        orderPage.style.display = "block";

        document.getElementById("welcome-message").innerText = `Welcome, ${savedName}!`;
    }
};
function logout() {
    localStorage.removeItem("userName");

    const orderPage = document.getElementById("order-page");
    orderPage.style.display = "none";

    const sectionsToShow = document.querySelectorAll("section:not(#order-page)");
    sectionsToShow.forEach(section => section.style.display = "block");

    location.reload();
}