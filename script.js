// Function to reload and display items from the API
function reloadd() {
  axios
    .get("https://crudcrud.com/api/69a11d9d2512450aa9e012c8241172d6/candy")
    .then((res) => {
      clearItems(); // Clear existing items before reloading
      for (var i = 0; i < res.data.length; i++) {
        showele(res.data[i]);
      }
    })
    .catch((err) => console.log("Error loading items"));
}

// Function to add an item to the screen and API
function addelement(e) {
  e.preventDefault();
  var item1 = document.getElementById("amount").value;
  var item2 = document.getElementById("job").value;
  var item3 = document.getElementById("category").value;
  var item4 = document.getElementById("quantity").value;

  let myobj = {
    price: item1,
    description: item2,
    name: item3,
    quantity: item4,
  };

  axios
    .post(
      "https://crudcrud.com/api/69a11d9d2512450aa9e012c8241172d6/candy/",
      myobj
    )
    .then((res) => {
      console.log(res);
      console.log(res.data);
      showele(res.data);
    })
    .catch((err) => console.log("Error adding item"));

  clearForm();
}

// Function to display an item on the screen
function showele(obj) {
  var items = document.getElementById("items");

  // Creating li
  var newitem = document.createElement("li");
  newitem.id = obj._id; // Set the ID of the new item

  // Attaching to li
  newitem.appendChild(document.createTextNode(`Price: ${obj.price}`));
  newitem.appendChild(
    document.createTextNode(`Description: ${obj.description}`)
  );
  newitem.appendChild(document.createTextNode(`Name: ${obj.name}`));

  // Display quantity dynamically
  var quantityNode = document.createElement("span");
  quantityNode.appendChild(
    document.createTextNode(`Quantity: ${obj.quantity}`)
  );
  newitem.appendChild(quantityNode);

  // Creating buy buttons
  for (let i = 1; i <= 3; i++) {
    var buyBtn = document.createElement("button");
    buyBtn.appendChild(document.createTextNode(`BUY ${i}`));
    buyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      updateQuantity(obj, i, quantityNode);
    });
    newitem.appendChild(buyBtn);
  }

  items.appendChild(newitem);
}

// Function to update quantity in place
function updateQuantity(obj, decrement, quantityNode) {
  var count = obj.quantity - decrement;

  if (count < 0) {
    alert("Stock finished");
    return;
  }

  let updated = {
    price: obj.price,
    description: obj.description,
    name: obj.name,
    quantity: count,
  };

  axios
    .put(
      "https://crudcrud.com/api/69a11d9d2512450aa9e012c8241172d6/candy/" +
        obj._id,
      updated
    )
    .then((res) => {
      // Update the displayed quantity dynamically

      quantityNode.textContent = `Quantity: ${count}`;
    })
    .catch((err) => console.log("Error updating quantity"));
}

// Function to clear the form after adding an item
function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("job").value = "";
  document.getElementById("category").value = "";
  document.getElementById("quantity").value = "";
}

// Function to clear all items from the screen
function clearItems() {
  var items = document.getElementById("items");
  items.innerHTML = "";
}

// Event listener for form submission
var form = document.getElementById("form_group");
form.addEventListener("submit", addelement);

// Load items on page load
window.addEventListener("DOMContentLoaded", reloadd);
