async function reloadd() {
  try {
    const res = await axios.get(
      "https://crudcrud.com/api/bdd05f587e0641d89ddd63ab0f9efc56/candy"
    );
    clearItems(); // Clear existing items before reloading
    for (let i = 0; i < res.data.length; i++) {
      showele(res.data[i]);
    }
  } catch (err) {
    console.error("Error loading items", err);
  }
}

// Function to add an item to the screen and API
async function addelement(e) {
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

  try {
    const res = await axios.post(
      "https://crudcrud.com/api/bdd05f587e0641d89ddd63ab0f9efc56/candy/",
      myobj
    );

    showele(res.data);
  } catch (err) {
    console.error("Error adding item", err);
  }

  clearForm();
}

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
async function updateQuantity(obj, decrement, quantityNode) {
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

  try {
    const res = await axios.put(
      `https://crudcrud.com/api/bdd05f587e0641d89ddd63ab0f9efc56/candy/${obj._id}`,
      updated
    );
    // Update the displayed quantity dynamically
    obj.quantity = count;
    quantityNode.textContent = `Quantity: ${count}`;
  } catch (err) {
    console.error("Error updating quantity", err);
  }
}

function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("job").value = "";
  document.getElementById("category").value = "";
  document.getElementById("quantity").value = "";
}

function clearItems() {
  var items = document.getElementById("items");
  items.innerHTML = "";
}

var form = document.getElementById("form_group");
form.addEventListener("submit", addelement);

window.addEventListener("DOMContentLoaded", reloadd);
