document.getElementByValue("dark").addEventListener("click",function(){
    let dark = document.getElementsByClassName("container");

    dark.style.backgroundColor = "lightblue";
    dark.style.color = "red";
});



        document.addEventListener("DOMContentLoaded", function() {
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            const miniCartPopup = document.getElementById('mini-cart-popup');
            const cartIcon = document.querySelector('.fa-shopping-cart');
            const closePopup = document.querySelector('.close');
        
            // Function to open mini cart popup
            function openMiniCartPopup() {
                miniCartPopup.style.display = 'block';
                document.body.classList.add('overlay');
            }
        
            // Function to close mini cart popup
            function closeMiniCartPopup() {
                miniCartPopup.style.display = 'none';
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
        
            // Rest of your existing code for adding/removing items from cart
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
                        removeButton.textContent = 'Remove';
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
