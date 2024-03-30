 // Store cart data in a JavaScript object
 let cartData = {
    items: [],
    total: 0
};

// Function to add item to cart
function addToCart(itemName, itemPrice) {
    // Add item to cartData
    cartData.items.push({ name: itemName, price: itemPrice });
    cartData.total += itemPrice;
}

// Function to remove item from cart
function removeFromCart(itemIndex) {
    const removedItem = cartData.items.splice(itemIndex, 1)[0];
    cartData.total -= removedItem.price;
}

// Transfer cartData to another HTML page using localStorage
localStorage.setItem('cartData', JSON.stringify(cartData));

document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const miniCartPopup = document.getElementById('mini-cart-popup');
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const closePopup = document.querySelector('.close');
    const overlay = document.getElementById('overlay');

    // Function to open mini cart popup
    function openMiniCartPopup() {
        miniCartPopup.style.display = 'block';
        overlay.style.display = 'block';
        document.body.classList.add('overlay');
    }

    // Function to close mini cart popup
    function closeMiniCartPopup() {
        miniCartPopup.style.display = 'none';
        overlay.style.display = 'none';
        document.body.classList.remove('overlay');
    }

    // Event listener for cart icon click
    cartIcon.addEventListener('click', function() {
        openMiniCartPopup();
    });

    // Event listener for close button click
    closePopup.addEventListener('click', function() {
        closeMiniCartPopup();
    });

    // Close mini cart popup when clicking outside of it
    overlay.addEventListener('click', function() {
        closeMiniCartPopup();
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const miniCart = document.getElementById('mini-cart');
    const cartItems = document.getElementById('cart-items');
    const totalCostElement = document.getElementById('total-cost');
    let totalCost = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            const itemImage = this.getAttribute('data-image'); // Added to get image URL

            // Check if item is already in the cart
            let existingItem = cartItems.querySelector(`li[data-name="${itemName}"]`);
            if (existingItem) {
                // Increment quantity if item already exists
                const quantityElement = existingItem.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                quantity++;
                quantityElement.textContent = quantity;
            } else {
                // Create list item for the cart
                const li = document.createElement('li');
                li.setAttribute('data-name', itemName);
                
                // Product Image
                const img = document.createElement('img');
                img.src = itemImage;
                img.width = 50;
                img.height = 50;
                li.appendChild(img);
                
                // Product Name and Price
                const textContent = document.createElement('span');
                textContent.textContent = `${itemName} - $${itemPrice} `;
                li.appendChild(textContent);
                
                // Quantity
                const quantitySpan = document.createElement('span');
                quantitySpan.textContent = 'Quantity: ';
                const quantityElement = document.createElement('span');
                quantityElement.textContent = '1'; // Initial quantity
                quantityElement.classList.add('quantity');
                quantitySpan.appendChild(quantityElement);
                li.appendChild(quantitySpan);
                
                // Remove button
                const removeButton = document.createElement('button');
                removeButton.innerHTML = '&#10005;'; // X symbol
                removeButton.classList.add('remove-item');
                li.appendChild(removeButton);

                // Add item to the cart
                cartItems.appendChild(li);
            }

            // Update total cost
            totalCost += itemPrice;
            totalCostElement.textContent = totalCost.toFixed(2);

            // Show mini cart
            miniCart.style.display = 'block';
        });
    });

    // Event listener for removing an item from the cart
    cartItems.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const itemToRemove = event.target.parentNode;
            const itemName = itemToRemove.getAttribute('data-name');
            const itemPrice = parseFloat(itemToRemove.querySelector('span').textContent.split(' - ')[1]); // Extract price
            const quantity = parseInt(itemToRemove.querySelector('.quantity').textContent);
            
            // Update total cost
            totalCost -= itemPrice * quantity;
            totalCostElement.textContent = totalCost.toFixed(2);

            // Remove item from the cart
            cartItems.removeChild(itemToRemove);

            // Hide mini cart if cart is empty
            if (cartItems.children.length === 0) {
                miniCart.style.display = 'none';
            }
        }
    });
});        

document.addEventListener("DOMContentLoaded", function() {
    let cartData = {
        items: [],
        total: 0
    };

    // Function to add item to cart
    function addToCart(itemName, itemPrice) {
        // Add item to cartData
        cartData.items.push({ name: itemName, price: itemPrice });
        cartData.total += itemPrice;
        saveCartDataToLocalStorage(); // Save cartData after adding an item
        updateCartUI(); // Update the cart UI
    }

    // Function to remove item from cart
    function removeFromCart(itemIndex) {
        const removedItem = cartData.items.splice(itemIndex, 1)[0];
        cartData.total -= removedItem.price;
        saveCartDataToLocalStorage(); // Save cartData after removing an item
        updateCartUI(); // Update the cart UI
    }

    // Function to save cartData to localStorage
    function saveCartDataToLocalStorage() {
        localStorage.setItem('cartData', JSON.stringify(cartData));
    }

    // Function to retrieve cartData from localStorage
    function getCartDataFromLocalStorage() {
        const cartDataString = localStorage.getItem('cartData');
        if (cartDataString) {
            cartData = JSON.parse(cartDataString);
        }
    }

    // Function to update the cart UI
    function updateCartUI() {
        // Update the UI elements to reflect the cartData
        // You need to implement this function based on your HTML structure
    }

    // Call the function to retrieve cartData from localStorage
    getCartDataFromLocalStorage();

    // Event listener for adding an item to the cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            addToCart(itemName, itemPrice);
        });
    });

    // Event listener for removing an item from the cart
    const cartItems = document.getElementById('cart-items');
    cartItems.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const itemIndex = event.target.parentNode.getAttribute('data-index');
            removeFromCart(itemIndex);
        }
    });

    // Rest of your existing code...
    const miniCart = document.getElementById('mini-cart');
    const totalCostElement = document.getElementById('total-cost');
    let totalCost = 0;

    // Event listener for checkout button
    document.getElementById('checkout').addEventListener('click', function() {
        // Save cartData to localStorage before navigating to cart.html
        saveCartDataToLocalStorage();
        window.location.href = 'cart.html';
    });
});
