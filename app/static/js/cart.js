function updateQuantity(productName, change) {
    let quantityInput = document.getElementById('quantity_' + productName);
    let currentQuantity = parseInt(quantityInput.value, 10);
    let newQuantity = currentQuantity + change;

    if (newQuantity < 0) {
        newQuantity = 0;
    }

    quantityInput.value = newQuantity;
    updateCart(productName);
}

function updateCart(productName) {
    let quantityInput = document.getElementById('quantity_' + productName);
    let quantity = parseInt(quantityInput.value, 10);
    let price = parseFloat(document.getElementById('price_' + productName).innerText);
    let totalSpan = document.getElementById('total_' + productName);


    let newTotal = price * quantity;
    totalSpan.innerText = newTotal.toFixed(2) + '₴';



    let hiddenQuantityInput = document.getElementById('hidden_quantity_' + productName);
    hiddenQuantityInput.value = quantity;


    updateTotalCost();
}

function updateTotalCost() {
    let totalCost = 0;
    document.querySelectorAll('[id^="total_"]').forEach(function(totalSpan) {
        let value = parseFloat(totalSpan.innerText);
        if (!isNaN(value)) {
            totalCost += value;
        }
    });

    document.getElementById('total_cost').innerText = totalCost.toFixed(2) + '₴';
}

document.addEventListener('DOMContentLoaded', function() {
    updateTotalCost();
});