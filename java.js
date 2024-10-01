// Function to add items to the cart
let cartPrices = []; // Array to store prices
let totalAmount = 0;

function addToCart(itemName,price) {
    const cart = document.getElementById('cart');
    const emptyMessage = cart.querySelector('p');

    // Remove the "No items in the cart" message if it exists
    if (emptyMessage && emptyMessage.textContent === "No items in the cart.") {
        emptyMessage.remove();
    }

    // Create a new cart item div
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.textContent = itemName;

    // Append the new item to the cart
    cart.appendChild(cartItem);

    // Add price to cartPrices array
    cartPrices.push(price);

    // Update the total price
    updateTotal();
}

// Function to update the total price
function updateTotal() {
    totalAmount = cartPrices.reduce((acc, curr) => acc + curr, 0);
    document.getElementById('total').textContent = "Total: Rs." + totalAmount;
}

        // Show the modal when Buy button is clicked
        function showModal() {
            const discount = totalAmount * 0.1;
            const netPrice = totalAmount - discount;

            document.getElementById('modal-total').textContent = "Total: Rs." + totalAmount;
            document.getElementById('modal-discount').textContent = "Discount (10%): -Rs." + discount.toFixed(2);
            document.getElementById('modal-net').textContent = "Net Price: Rs." + netPrice.toFixed(2);

            document.getElementById('buyModal').style.display = 'block';
        }

        // Close the modal
        function closeModal() {
            document.getElementById('buyModal').style.display = 'none';
        }

        // Generate PDF with the total and net price
        function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const discount = totalAmount * 0.1;
            const netPrice = totalAmount - discount;

            doc.text("Shop Name: Mos Burgers", 10, 10);
            doc.text("Total: Rs." + totalAmount, 10, 20);
            doc.text("Discount (10%): -Rs." + discount.toFixed(2), 10, 30);
            doc.text("Net Price: Rs." + netPrice.toFixed(2), 10, 40);

            // Save the PDF
            doc.save("receipt.pdf");

            // Close the modal after generating PDF
            closeModal();
        }
///////////////////////////
        function itemmannger(type){
             // Hide all menu items
             const allItems = document.querySelectorAll('.item');
             allItems.forEach(item => item.classList.remove('visible'));

             showadditemform();
        }
        function showadditemform(){
            document.getElementById('itemaddarea').style.display = 'block';
        }

        function showAddItemModal() {
            document.getElementById('addItemModal').style.display = 'block';
        }

        function closeAddItemModal() {
            document.getElementById('addItemModal').style.display = 'none';
        }

        function addItem() {
            const itemName = document.getElementById('newItemName').value;
            const itemPrice = parseFloat(document.getElementById('newItemPrice').value);
            const itemImg = document.getElementById('newItemImg').value;

            if (itemName && itemPrice && itemImg) {
                const menu = document.getElementById('itemmenu');
                const newItem = document.createElement('div');
                newItem.classList.add('item,visible,burger');
                newItem.innerHTML = `<div class="item visible burger"><p>${itemName} - Rs.${itemPrice}</p><img src="${itemImg}" alt="${itemName}" width="75"><br><button class="add-btn" onclick="addToCart('${itemName}', ${itemPrice})">Add</button></div>`;
                menu.appendChild(newItem);
                
                // Add the new item to the array and save it to localStorage
                newMenuItems.push({ name: itemName, price: itemPrice, img: itemImg });
                localStorage.setItem('newMenuItems', JSON.stringify(newMenuItems));
                
                closeAddItemModal();
            }
        }


    //    updated items show when reload
// Load new items from the array when the page loads
// let newMenuItems = JSON.parse(localStorage.getItem('newMenuItems')) || [];
// window.onload = function () {
//     displayNewItems();
// };

// function displayNewItems() {
//     const menu = document.getElementById('itemmenu');
//     newMenuItems.forEach(item => {
//         const newItem = document.createElement('div');
//         newItem.classList.add('item,visible,burger');
//         newItem.innerHTML = `<p>${item.name} - $${item.price}</p><img src="${item.img}" alt="${item.name}" width="50"><br><button onclick="addToCart('${item.name}', ${item.price})">Add</button>`;
//         menu.appendChild(newItem);
//     });
// }

// function showItems(type) {
//     const allItems = document.querySelectorAll('.item,visible,burger');
//     allItems.forEach(item => item.classList.remove('visible'));
//     const selectedItems = document.querySelectorAll('.' + type);
//     selectedItems.forEach(item => item.classList.add('visible'));
// }

////////////// serach bar code//////////

function searchItems() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemName = item.querySelector('p').textContent.toLowerCase();
        if (itemName.includes(searchInput)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}