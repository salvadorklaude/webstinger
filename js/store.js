var removeCartItemButtons = document.getElementsByClassName("fa fa-close")
for (var i = 0; i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function() {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()

    })
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-Popup")[0]
    cartItemContainer.getElementsByClassName("cart-row")
    for (var i = 0; i < cart-row.length; i++){
        var cartRow = cart-row[i]
        var priceElement = cartRow.getElementsByClassName()
    }
}   